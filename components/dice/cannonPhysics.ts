import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { FaceData, detectUpwardFace, buildDieGeometryDefinition } from './diceGeometry';

export interface PhysicsDiceInstance {
  body: CANNON.Body;
  faces: FaceData[];
  sides: number;
  isSettled: boolean;
  settledTimer: number;
  lastUpwardResult: { value: number; label: string; faceIndex: number; dot: number };
  initialSeed: string;
}

export interface RollTelemetry {
  diceId: number;
  position: { x: number; y: number; z: number };
  velocity: number;
  angularVelocity: number;
  isSettled: boolean;
  topValue: number;
  topLabel: string;
  dotProduct: number;
}

export interface MonteCarloStats {
  sides: number;
  totalRolls: number;
  distribution: Record<number, number>;
  probabilities: Record<number, number>;
  expectedProbability: number;
  maxDeviation: number;
  chiSquare: number;
}

export function secureRandomRange(min: number, max: number): number {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    const rand = arr[0] / (0xffffffff + 1);
    return min + rand * (max - min);
  }
  return min + Math.random() * (max - min);
}

export function generateCryptoSeed(): string {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    const arr = new Uint8Array(8);
    window.crypto.getRandomValues(arr);
    return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('');
  }
  return Math.random().toString(36).substring(2, 10);
}

export class DicePhysicsEngine {
  public world: CANNON.World;
  public diceBodies: PhysicsDiceInstance[] = [];
  public floorBody: CANNON.Body | null = null;
  public ceilingBody: CANNON.Body | null = null;
  public wallBodies: CANNON.Body[] = [];
  public diceMaterial: CANNON.Material;
  public floorMaterial: CANNON.Material;
  public wallMaterial: CANNON.Material;

  public trayWidth = 13.0;
  public trayDepth = 10.5;
  public trayWallHeight = 3.6;

  private onImpactCallback?: (velocity: number, isDiceToDice: boolean) => void;

  constructor(onImpact?: (velocity: number, isDiceToDice: boolean) => void) {
    this.onImpactCallback = onImpact;

    this.world = new CANNON.World();
    this.world.gravity.set(0, -24, 0); // Realistic snappy tabletop gravity
    this.world.allowSleep = true;

    this.world.defaultContactMaterial.contactEquationStiffness = 1e8;
    this.world.defaultContactMaterial.contactEquationRelaxation = 3;

    this.diceMaterial = new CANNON.Material('dice');
    this.floorMaterial = new CANNON.Material('feltFloor');
    this.wallMaterial = new CANNON.Material('woodWall');

    // Contact material configurations with realistic felt damping and wood wall bounce
    const diceFloorContact = new CANNON.ContactMaterial(this.diceMaterial, this.floorMaterial, {
      friction: 0.36,
      restitution: 0.35,
      contactEquationStiffness: 1e8,
      contactEquationRelaxation: 3
    });

    const diceDiceContact = new CANNON.ContactMaterial(this.diceMaterial, this.diceMaterial, {
      friction: 0.26,
      restitution: 0.52, // Energetic separation bounce when dice collide
      contactEquationStiffness: 1e8,
      contactEquationRelaxation: 3
    });

    const diceWallContact = new CANNON.ContactMaterial(this.diceMaterial, this.wallMaterial, {
      friction: 0.30,
      restitution: 0.44,
      contactEquationStiffness: 1e8,
      contactEquationRelaxation: 3
    });

    this.world.addContactMaterial(diceFloorContact);
    this.world.addContactMaterial(diceDiceContact);
    this.world.addContactMaterial(diceWallContact);

    this.setupArenaBoundaries(this.trayWidth, this.trayDepth, this.trayWallHeight);
  }

  // Setup rigid tabletop felt floor, perimeter walls, and upper ceiling barrier
  public setupArenaBoundaries(width = 13.0, depth = 10.5, height = 3.6) {
    this.trayWidth = width;
    this.trayDepth = depth;
    this.trayWallHeight = height;

    if (this.floorBody) this.world.removeBody(this.floorBody);
    if (this.ceilingBody) this.world.removeBody(this.ceilingBody);
    this.wallBodies.forEach((w) => this.world.removeBody(w));
    this.wallBodies = [];

    // Felt Floor
    const floorShape = new CANNON.Plane();
    this.floorBody = new CANNON.Body({
      mass: 0,
      material: this.floorMaterial,
      shape: floorShape
    });
    this.floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
    this.floorBody.position.set(0, 0, 0);
    this.world.addBody(this.floorBody);

    // Invisible High Ceiling Guard
    const ceilingShape = new CANNON.Plane();
    this.ceilingBody = new CANNON.Body({
      mass: 0,
      material: this.wallMaterial,
      shape: ceilingShape
    });
    this.ceilingBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
    this.ceilingBody.position.set(0, 10.0, 0);
    this.world.addBody(this.ceilingBody);

    // 4 Solid Tray Walls
    const wallThickness = 1.0;
    const halfW = width / 2;
    const halfD = depth / 2;
    const halfH = height / 2;

    const wallConfigs = [
      { pos: new CANNON.Vec3(0, halfH, halfD + wallThickness / 2), size: new CANNON.Vec3(halfW + wallThickness, halfH, wallThickness / 2) },
      { pos: new CANNON.Vec3(0, halfH, -halfD - wallThickness / 2), size: new CANNON.Vec3(halfW + wallThickness, halfH, wallThickness / 2) },
      { pos: new CANNON.Vec3(halfW + wallThickness / 2, halfH, 0), size: new CANNON.Vec3(wallThickness / 2, halfH, halfD + wallThickness) },
      { pos: new CANNON.Vec3(-halfW - wallThickness / 2, halfH, 0), size: new CANNON.Vec3(wallThickness / 2, halfH, halfD + wallThickness) }
    ];

    wallConfigs.forEach((cfg) => {
      const wallShape = new CANNON.Box(cfg.size);
      const wallBody = new CANNON.Body({
        mass: 0,
        material: this.wallMaterial,
        shape: wallShape,
        position: cfg.pos
      });
      this.world.addBody(wallBody);
      this.wallBodies.push(wallBody);
    });
  }

  // Spawn and throw physical dice with natural spatial dispersion across the felt tray
  public spawnAndThrowDice(
    count: number,
    sides: number,
    dragImpulse?: { x: number; y: number; z: number }
  ): PhysicsDiceInstance[] {
    this.diceBodies.forEach((d) => this.world.removeBody(d.body));
    this.diceBodies = [];

    const geomDef = buildDieGeometryDefinition(sides);

    for (let i = 0; i < count; i++) {
      const seed = generateCryptoSeed();
      const body = new CANNON.Body({
        mass: 1.3,
        material: this.diceMaterial,
        shape: geomDef.cannonShape,
        linearDamping: 0.22,
        angularDamping: 0.32,
        sleepSpeedLimit: 0.05,
        sleepTimeLimit: 0.25
      });

      // Scatter spawn coordinates across different sectors of the tray
      const angle = (i / Math.max(1, count)) * Math.PI * 2 + secureRandomRange(-0.35, 0.35);
      const maxRadius = count > 1 ? Math.min(3.2, 0.8 + 0.6 * Math.sqrt(count)) : 0;
      const radius = count > 1 ? secureRandomRange(0.8, maxRadius) : 0;

      const startX = Math.cos(angle) * radius + secureRandomRange(-0.3, 0.3);
      const startY = secureRandomRange(5.4, 7.0);
      const startZ = Math.sin(angle) * radius + secureRandomRange(-0.3, 0.3);

      body.position.set(startX, startY, startZ);

      // Random starting orientation
      const qX = secureRandomRange(-1, 1);
      const qY = secureRandomRange(-1, 1);
      const qZ = secureRandomRange(-1, 1);
      const qW = secureRandomRange(-1, 1);
      body.quaternion.set(qX, qY, qZ, qW).normalize();

      // Divergent launch velocities so dice scatter apart across the tray
      const launchAngle = angle + Math.PI + secureRandomRange(-0.8, 0.8);
      const launchSpeed = secureRandomRange(3.5, 6.0);

      let impulseX = Math.cos(launchAngle) * launchSpeed;
      let impulseY = secureRandomRange(-5.5, -2.5); // Downward velocity
      let impulseZ = Math.sin(launchAngle) * launchSpeed;

      if (dragImpulse) {
        impulseX += dragImpulse.x * 0.7;
        impulseY += dragImpulse.y * 0.5;
        impulseZ += dragImpulse.z * 0.7;
      }

      body.velocity.set(impulseX, impulseY, impulseZ);

      // Random 3-axis angular momentum / tumble torque
      const torqueX = secureRandomRange(-22, 22);
      const torqueY = secureRandomRange(-22, 22);
      const torqueZ = secureRandomRange(-22, 22);
      body.angularVelocity.set(torqueX, torqueY, torqueZ);

      body.addEventListener('collide', (e: { contact: CANNON.ContactEquation; body: CANNON.Body; target: CANNON.Body }) => {
        const relVel = e.contact.getImpactVelocityAlongNormal();
        if (Math.abs(relVel) > 0.7 && this.onImpactCallback) {
          const isDice = e.body.material === this.diceMaterial || e.target.material === this.diceMaterial;
          this.onImpactCallback(Math.min(1.0, Math.abs(relVel) / 7), isDice);
        }
      });

      this.world.addBody(body);

      this.diceBodies.push({
        body,
        faces: geomDef.faces,
        sides,
        isSettled: false,
        settledTimer: 0,
        lastUpwardResult: detectUpwardFace(body.quaternion, geomDef.faces),
        initialSeed: seed
      });
    }

    return this.diceBodies;
  }

  // Step physics simulation and monitor settling conditions
  public step(dt: number): boolean {
    this.world.step(1 / 60, dt, 3);

    let allSettled = true;
    const halfW = (this.trayWidth / 2) - 0.5;
    const halfD = (this.trayDepth / 2) - 0.5;

    for (const d of this.diceBodies) {
      // Containment wall guard
      if (d.body.position.x > halfW) {
        d.body.position.x = halfW;
        d.body.velocity.x *= -0.5;
      } else if (d.body.position.x < -halfW) {
        d.body.position.x = -halfW;
        d.body.velocity.x *= -0.5;
      }

      if (d.body.position.z > halfD) {
        d.body.position.z = halfD;
        d.body.velocity.z *= -0.5;
      } else if (d.body.position.z < -halfD) {
        d.body.position.z = -halfD;
        d.body.velocity.z *= -0.5;
      }

      if (d.body.position.y < 0.1) {
        d.body.position.y = Math.max(0.1, d.body.position.y);
      }

      const v = d.body.velocity.length();
      const w = d.body.angularVelocity.length();

      d.lastUpwardResult = detectUpwardFace(d.body.quaternion, d.faces);

      if (v < 0.06 && w < 0.09 && d.body.position.y < 1.8) {
        d.settledTimer += dt;
        if (d.settledTimer > 0.30) {
          d.isSettled = true;
        } else {
          allSettled = false;
        }
      } else {
        d.settledTimer = 0;
        d.isSettled = false;
        allSettled = false;
      }
    }

    return allSettled && this.diceBodies.length > 0;
  }

  // Collect real-time telemetry for developer mode
  public getTelemetry(): RollTelemetry[] {
    return this.diceBodies.map((d, idx) => ({
      diceId: idx + 1,
      position: {
        x: Number(d.body.position.x.toFixed(2)),
        y: Number(d.body.position.y.toFixed(2)),
        z: Number(d.body.position.z.toFixed(2))
      },
      velocity: Number(d.body.velocity.length().toFixed(2)),
      angularVelocity: Number(d.body.angularVelocity.length().toFixed(2)),
      isSettled: d.isSettled,
      topValue: d.lastUpwardResult.value,
      topLabel: d.lastUpwardResult.label,
      dotProduct: Number(d.lastUpwardResult.dot.toFixed(3))
    }));
  }

  // Headless Monte Carlo simulation
  public static runHeadlessMonteCarlo(sides: number, totalRolls = 1000): MonteCarloStats {
    const engine = new DicePhysicsEngine();
    const distribution: Record<number, number> = {};
    const geomDef = buildDieGeometryDefinition(sides);

    geomDef.faces.forEach((f) => {
      distribution[f.value] = 0;
    });

    for (let r = 0; r < totalRolls; r++) {
      engine.spawnAndThrowDice(1, sides);
      const diceInst = engine.diceBodies[0];

      let settled = false;
      for (let stepCount = 0; stepCount < 300; stepCount++) {
        settled = engine.step(1 / 60);
        if (settled) break;
      }

      const res = detectUpwardFace(diceInst.body.quaternion, diceInst.faces);
      distribution[res.value] = (distribution[res.value] || 0) + 1;
    }

    const probabilities: Record<number, number> = {};
    const totalFaces = geomDef.faces.length;
    const expected = 100 / totalFaces;
    let maxDev = 0;
    let chiSquare = 0;

    Object.entries(distribution).forEach(([valStr, count]) => {
      const v = Number(valStr);
      const prob = (count / totalRolls) * 100;
      probabilities[v] = Number(prob.toFixed(2));

      const dev = Math.abs(prob - expected);
      if (dev > maxDev) maxDev = dev;

      const expectedCount = totalRolls / totalFaces;
      chiSquare += Math.pow(count - expectedCount, 2) / expectedCount;
    });

    return {
      sides,
      totalRolls,
      distribution,
      probabilities,
      expectedProbability: Number(expected.toFixed(2)),
      maxDeviation: Number(maxDev.toFixed(2)),
      chiSquare: Number(chiSquare.toFixed(2))
    };
  }
}
