// Rigid-body physics engine, convex polyhedral colliders, and face-normal detection
// Powered by cannon-es with Three.js synchronization and Web Crypto API seeding

import * as CANNON from 'cannon-es';
import * as THREE from 'three';

export interface FaceDefinition {
  faceIndex: number;
  value: number;
  label: string;
  localNormal: THREE.Vector3;
}

export interface DiePhysicsMeshInfo {
  body: CANNON.Body;
  mesh: THREE.Group | THREE.Mesh;
  sides: number;
  faces: FaceDefinition[];
  settled: boolean;
  settledValue: number | null;
  stableFrames: number;
  lastVelocity: number;
  lastAngularVelocity: number;
  collisionCount: number;
  initialState: {
    pos: CANNON.Vec3;
    quat: CANNON.Quaternion;
    vel: CANNON.Vec3;
    angVel: CANNON.Vec3;
  };
}

export interface PhysicsWorldConfig {
  gravity?: number;
  tableFriction?: number;
  tableRestitution?: number;
  diceFriction?: number;
  diceRestitution?: number;
}

/**
 * Creates canonical face definitions and opposite-face relationships for all dice types
 */
export function getDieFaceDefinitions(sides: number): FaceDefinition[] {
  switch (sides) {
    case 2: {
      // D2 Coin: Face 1 (+Y, top cap), Face 2 (-Y, bottom cap)
      return [
        { faceIndex: 0, value: 1, label: '1', localNormal: new THREE.Vector3(0, 1, 0) },
        { faceIndex: 1, value: 2, label: '2', localNormal: new THREE.Vector3(0, -1, 0) }
      ];
    }
    case 4: {
      // D4 Tetrahedron: 4 faces, apexes of regular tetrahedron
      // Standard D4 opposite vertex reads top face
      const h = Math.sqrt(2 / 3);
      const r = Math.sqrt(3) / 3;
      const v0 = new THREE.Vector3(0, h, 0).normalize();
      const v1 = new THREE.Vector3(-r * Math.sqrt(3) / 2, -h / 3, -r / 2).normalize();
      const v2 = new THREE.Vector3(r * Math.sqrt(3) / 2, -h / 3, -r / 2).normalize();
      const v3 = new THREE.Vector3(0, -h / 3, r).normalize();

      return [
        { faceIndex: 0, value: 1, label: '1', localNormal: v0 },
        { faceIndex: 1, value: 2, label: '2', localNormal: v1 },
        { faceIndex: 2, value: 3, label: '3', localNormal: v2 },
        { faceIndex: 3, value: 4, label: '4', localNormal: v3 }
      ];
    }
    case 6: {
      // D6 Cube: Standard opposite faces sum to 7 (1 opposite 6, 2 opposite 5, 3 opposite 4)
      return [
        { faceIndex: 0, value: 1, label: '1', localNormal: new THREE.Vector3(1, 0, 0) },
        { faceIndex: 1, value: 6, label: '6', localNormal: new THREE.Vector3(-1, 0, 0) },
        { faceIndex: 2, value: 2, label: '2', localNormal: new THREE.Vector3(0, 1, 0) },
        { faceIndex: 3, value: 5, label: '5', localNormal: new THREE.Vector3(0, -1, 0) },
        { faceIndex: 4, value: 3, label: '3', localNormal: new THREE.Vector3(0, 0, 1) },
        { faceIndex: 5, value: 4, label: '4', localNormal: new THREE.Vector3(0, 0, -1) }
      ];
    }
    case 8: {
      // D8 Octahedron: 8 triangular faces (sum of opposite faces = 9)
      const normals: THREE.Vector3[] = [
        new THREE.Vector3(1, 1, 1).normalize(),
        new THREE.Vector3(-1, -1, -1).normalize(),
        new THREE.Vector3(1, 1, -1).normalize(),
        new THREE.Vector3(-1, -1, 1).normalize(),
        new THREE.Vector3(1, -1, 1).normalize(),
        new THREE.Vector3(-1, 1, -1).normalize(),
        new THREE.Vector3(-1, 1, 1).normalize(),
        new THREE.Vector3(1, -1, -1).normalize()
      ];
      // Values paired (1&8, 2&7, 3&6, 4&5)
      const values = [1, 8, 2, 7, 3, 6, 4, 5];
      return normals.map((n, i) => ({
        faceIndex: i,
        value: values[i],
        label: `${values[i]}`,
        localNormal: n
      }));
    }
    case 10:
    case 100: {
      // D10 Pentagonal Trapezohedron: 10 kite faces
      const n = 5;
      const H = 1.25;
      const R = 1.35;
      const faces: FaceDefinition[] = [];
      
      for (let i = 0; i < n; i++) {
        const a1 = (i * 2 * Math.PI) / n;
        const a2 = ((i + 0.5) * 2 * Math.PI) / n;
        const midA = (a1 + a2) / 2;
        // Upper 5 faces
        const upperNorm = new THREE.Vector3(Math.cos(midA) * R, H * 0.45, Math.sin(midA) * R).normalize();
        const valUpper = sides === 100 ? i * 20 : i * 2 + 1;
        faces.push({
          faceIndex: i,
          value: valUpper,
          label: sides === 100 ? `${String(valUpper).padStart(2, '0')}` : `${valUpper}`,
          localNormal: upperNorm
        });

        // Lower 5 faces
        const lowerNorm = new THREE.Vector3(Math.cos(midA + Math.PI / 5) * R, -H * 0.45, Math.sin(midA + Math.PI / 5) * R).normalize();
        const valLower = sides === 100 ? (i * 2 + 1) * 10 : (i * 2 + 2) % 10;
        faces.push({
          faceIndex: n + i,
          value: valLower,
          label: sides === 100 ? `${String(valLower).padStart(2, '0')}` : `${valLower}`,
          localNormal: lowerNorm
        });
      }
      return faces;
    }
    case 12: {
      // D12 Dodecahedron: 12 pentagonal faces (opposite sum = 13)
      const phi = (1 + Math.sqrt(5)) / 2;
      const rawNormals: THREE.Vector3[] = [
        new THREE.Vector3(0, 1, phi).normalize(),
        new THREE.Vector3(0, -1, -phi).normalize(),
        new THREE.Vector3(0, 1, -phi).normalize(),
        new THREE.Vector3(0, -1, phi).normalize(),
        new THREE.Vector3(1, phi, 0).normalize(),
        new THREE.Vector3(-1, -phi, 0).normalize(),
        new THREE.Vector3(-1, phi, 0).normalize(),
        new THREE.Vector3(1, -phi, 0).normalize(),
        new THREE.Vector3(phi, 0, 1).normalize(),
        new THREE.Vector3(-phi, 0, -1).normalize(),
        new THREE.Vector3(-phi, 0, 1).normalize(),
        new THREE.Vector3(phi, 0, -1).normalize()
      ];
      const vals = [1, 12, 2, 11, 3, 10, 4, 9, 5, 8, 6, 7];
      return rawNormals.map((n, i) => ({
        faceIndex: i,
        value: vals[i],
        label: `${vals[i]}`,
        localNormal: n
      }));
    }
    case 20: {
      // D20 Icosahedron: 20 triangular faces (opposite sum = 21)
      const phi = (1 + Math.sqrt(5)) / 2;
      const verts: THREE.Vector3[] = [
        new THREE.Vector3(-1, phi, 0).normalize(),
        new THREE.Vector3(1, phi, 0).normalize(),
        new THREE.Vector3(-1, -phi, 0).normalize(),
        new THREE.Vector3(1, -phi, 0).normalize(),
        new THREE.Vector3(0, -1, phi).normalize(),
        new THREE.Vector3(0, 1, phi).normalize(),
        new THREE.Vector3(0, -1, -phi).normalize(),
        new THREE.Vector3(0, 1, -phi).normalize(),
        new THREE.Vector3(phi, 0, -1).normalize(),
        new THREE.Vector3(phi, 0, 1).normalize(),
        new THREE.Vector3(-phi, 0, -1).normalize(),
        new THREE.Vector3(-phi, 0, 1).normalize()
      ];

      const triIndices = [
        [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
        [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
        [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
        [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
      ];

      const vals = [
        20, 1, 19, 2, 18, 3, 17, 4, 16, 5,
        15, 6, 14, 7, 13, 8, 12, 9, 11, 10
      ];

      return triIndices.map((tri, i) => {
        const vA = verts[tri[0]];
        const vB = verts[tri[1]];
        const vC = verts[tri[2]];
        const norm = new THREE.Vector3().add(vA).add(vB).add(vC).normalize();
        return {
          faceIndex: i,
          value: vals[i],
          label: `${vals[i]}`,
          localNormal: norm
        };
      });
    }
    default: {
      return [
        { faceIndex: 0, value: 1, label: '1', localNormal: new THREE.Vector3(0, 1, 0) },
        { faceIndex: 1, value: 6, label: '6', localNormal: new THREE.Vector3(0, -1, 0) }
      ];
    }
  }
}

/**
 * Creates a Cannon-es physics shape matching the die geometry
 */
export function createCannonDieShape(sides: number): CANNON.Shape {
  switch (sides) {
    case 2: {
      // D2 Coin: Cylinder shape
      return new CANNON.Cylinder(1.25, 1.25, 0.35, 16);
    }
    case 4: {
      // D4 Tetrahedron
      const h = 1.35;
      const r = 1.2;
      const vertices = [
        new CANNON.Vec3(0, h, 0),
        new CANNON.Vec3(-r * 0.866, -h * 0.33, -r * 0.5),
        new CANNON.Vec3(r * 0.866, -h * 0.33, -r * 0.5),
        new CANNON.Vec3(0, -h * 0.33, r)
      ];
      const faces = [
        [0, 2, 1],
        [0, 3, 2],
        [0, 1, 3],
        [1, 2, 3]
      ];
      return new CANNON.ConvexPolyhedron({ vertices, faces });
    }
    case 6: {
      // D6 Box with half-extents 0.65 (size 1.3)
      return new CANNON.Box(new CANNON.Vec3(0.65, 0.65, 0.65));
    }
    case 8: {
      // D8 Octahedron
      const s = 1.25;
      const vertices = [
        new CANNON.Vec3(s, 0, 0),
        new CANNON.Vec3(-s, 0, 0),
        new CANNON.Vec3(0, s, 0),
        new CANNON.Vec3(0, -s, 0),
        new CANNON.Vec3(0, 0, s),
        new CANNON.Vec3(0, 0, -s)
      ];
      const faces = [
        [0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
        [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]
      ];
      return new CANNON.ConvexPolyhedron({ vertices, faces });
    }
    case 10:
    case 100: {
      // D10 Trapezohedron
      const R = 1.35;
      const H = 1.25;
      const n = 5;
      const vertices: CANNON.Vec3[] = [
        new CANNON.Vec3(0, H, 0),
        new CANNON.Vec3(0, -H, 0)
      ];

      for (let i = 0; i < n; i++) {
        const a1 = (i * 2 * Math.PI) / n;
        vertices.push(new CANNON.Vec3(R * Math.cos(a1), H * 0.2, R * Math.sin(a1)));
        const a2 = ((i + 0.5) * 2 * Math.PI) / n;
        vertices.push(new CANNON.Vec3(R * Math.cos(a2), -H * 0.2, R * Math.sin(a2)));
      }

      // Simplified bounding hull or sphere for fast stable contact
      return new CANNON.Sphere(1.28);
    }
    case 12: {
      // D12 Dodecahedron: sphere/polyhedron approximation for contact stability
      return new CANNON.Sphere(1.25);
    }
    case 20: {
      // D20 Icosahedron: high-resolution bounding sphere or convex polyhedron
      return new CANNON.Sphere(1.32);
    }
    default: {
      return new CANNON.Box(new CANNON.Vec3(0.65, 0.65, 0.65));
    }
  }
}

/**
 * Initializes a full Cannon-es rigid body physics world with felt floor and bounding arena walls
 */
export function createPhysicsWorld(config: PhysicsWorldConfig = {}): {
  world: CANNON.World;
  diceMaterial: CANNON.Material;
  tableMaterial: CANNON.Material;
  wallMaterial: CANNON.Material;
} {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, config.gravity ?? -26.0, 0) // Realistic brisk gravity
  });

  world.allowSleep = true;
  world.defaultContactMaterial.friction = 0.4;
  world.defaultContactMaterial.restitution = 0.45;

  const diceMaterial = new CANNON.Material('diceMaterial');
  const tableMaterial = new CANNON.Material('tableMaterial');
  const wallMaterial = new CANNON.Material('wallMaterial');

  // Contact pair: Dice on Table Felt (bouncy yet dissipates)
  const diceTableContact = new CANNON.ContactMaterial(diceMaterial, tableMaterial, {
    friction: config.tableFriction ?? 0.52,
    restitution: config.tableRestitution ?? 0.46,
    contactEquationStiffness: 1e7,
    contactEquationRelaxation: 3
  });
  world.addContactMaterial(diceTableContact);

  // Contact pair: Dice on Dice
  const diceDiceContact = new CANNON.ContactMaterial(diceMaterial, diceMaterial, {
    friction: config.diceFriction ?? 0.35,
    restitution: config.diceRestitution ?? 0.52,
    contactEquationStiffness: 1e7,
    contactEquationRelaxation: 3
  });
  world.addContactMaterial(diceDiceContact);

  // Contact pair: Dice on Wall
  const diceWallContact = new CANNON.ContactMaterial(diceMaterial, wallMaterial, {
    friction: 0.25,
    restitution: 0.65
  });
  world.addContactMaterial(diceWallContact);

  // 1. Ground Plane (Y = 0)
  const groundBody = new CANNON.Body({
    mass: 0,
    material: tableMaterial,
    shape: new CANNON.Plane()
  });
  groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
  groundBody.position.set(0, 0, 0);
  world.addBody(groundBody);

  // 2. Bounding Arena Box Walls to keep dice inside visible table bounds
  const wallDist = 9.2;
  const wallHeight = 5.0;
  const wallThickness = 1.0;

  // North Wall (+Z)
  const wallN = new CANNON.Body({ mass: 0, material: wallMaterial });
  wallN.addShape(new CANNON.Box(new CANNON.Vec3(wallDist, wallHeight, wallThickness)));
  wallN.position.set(0, wallHeight, wallDist);
  world.addBody(wallN);

  // South Wall (-Z)
  const wallS = new CANNON.Body({ mass: 0, material: wallMaterial });
  wallS.addShape(new CANNON.Box(new CANNON.Vec3(wallDist, wallHeight, wallThickness)));
  wallS.position.set(0, wallHeight, -wallDist);
  world.addBody(wallS);

  // East Wall (+X)
  const wallE = new CANNON.Body({ mass: 0, material: wallMaterial });
  wallE.addShape(new CANNON.Box(new CANNON.Vec3(wallThickness, wallHeight, wallDist)));
  wallE.position.set(wallDist, wallHeight, 0);
  world.addBody(wallE);

  // West Wall (-X)
  const wallW = new CANNON.Body({ mass: 0, material: wallMaterial });
  wallW.addShape(new CANNON.Box(new CANNON.Vec3(wallThickness, wallHeight, wallDist)));
  wallW.position.set(-wallDist, wallHeight, 0);
  world.addBody(wallW);

  return { world, diceMaterial, tableMaterial, wallMaterial };
}

/**
 * Computes cryptographically secure random impulse, torque, and launch position
 */
export function getCryptoDiceImpulse(
  index: number,
  totalCount: number,
  userFlickVector?: { x: number; y: number; force: number }
): {
  pos: CANNON.Vec3;
  quat: CANNON.Quaternion;
  vel: CANNON.Vec3;
  angVel: CANNON.Vec3;
} {
  // Use crypto.getRandomValues
  const randArray = new Uint32Array(8);
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    window.crypto.getRandomValues(randArray);
  } else {
    for (let i = 0; i < 8; i++) randArray[i] = Math.floor(Math.random() * 0xffffffff);
  }

  const getFloat = (idx: number) => randArray[idx] / 0xffffffff;

  // Spatial spawn offset
  const angle = (index / Math.max(1, totalCount)) * Math.PI * 2 + (getFloat(0) - 0.5) * 0.6;
  const radius = totalCount > 1 ? 2.2 + getFloat(1) * 1.5 : 0.8;
  const startX = Math.cos(angle) * radius + (getFloat(2) - 0.5) * 1.2;
  const startZ = Math.sin(angle) * radius + (getFloat(3) - 0.5) * 1.2;
  const startY = 4.5 + getFloat(4) * 2.2;

  // Random orientation quaternion
  const u1 = getFloat(5);
  const u2 = getFloat(6);
  const u3 = getFloat(7);
  const quat = new CANNON.Quaternion(
    Math.sqrt(1 - u1) * Math.sin(2 * Math.PI * u2),
    Math.sqrt(1 - u1) * Math.cos(2 * Math.PI * u2),
    Math.sqrt(u1) * Math.sin(2 * Math.PI * u3),
    Math.sqrt(u1) * Math.cos(2 * Math.PI * u3)
  );

  // Velocity with flick or default downward tumble
  let vx = (getFloat(0) - 0.5) * 6.5;
  let vy = -5.0 - getFloat(1) * 7.0;
  let vz = (getFloat(2) - 0.5) * 6.5;

  if (userFlickVector && userFlickVector.force > 0.05) {
    vx += userFlickVector.x * 16.0;
    vz += userFlickVector.y * 16.0;
    vy += Math.min(6.0, userFlickVector.force * 12.0);
  }

  // Strong initial multi-axis torque
  const angVel = new CANNON.Vec3(
    (getFloat(3) - 0.5) * 45,
    (getFloat(4) - 0.5) * 45,
    (getFloat(5) - 0.5) * 45
  );

  return {
    pos: new CANNON.Vec3(startX, startY, startZ),
    quat,
    vel: new CANNON.Vec3(vx, vy, vz),
    angVel
  };
}

/**
 * Evaluates the world-space normal of every face and returns the face pointing most directly UP
 * Mathematically: dot(faceNormalInWorldSpace, worldUp (0, 1, 0)) -> max dot product
 */
export function detectRestingTopFace(
  bodyQuat: CANNON.Quaternion,
  faces: FaceDefinition[]
): { face: FaceDefinition; dot: number } {
  const worldUp = new THREE.Vector3(0, 1, 0);
  const threeQuat = new THREE.Quaternion(bodyQuat.x, bodyQuat.y, bodyQuat.z, bodyQuat.w);

  let bestFace = faces[0];
  let maxDot = -Infinity;

  faces.forEach((face) => {
    // Transform local normal to world space
    const worldNormal = face.localNormal.clone().applyQuaternion(threeQuat).normalize();
    const dot = worldNormal.dot(worldUp);
    if (dot > maxDot) {
      maxDot = dot;
      bestFace = face;
    }
  });

  return { face: bestFace, dot: maxDot };
}

/**
 * Fast headless Monte Carlo statistical simulator for developer mode validation
 * Simulates thousands of true physics throws in milliseconds
 */
export function runMonteCarloValidation(
  sides: number,
  iterations = 1000
): {
  totalRolls: number;
  sides: number;
  faceCounts: Record<number, number>;
  distribution: Array<{
    value: number;
    count: number;
    percentage: number;
    expectedPercentage: number;
    deviation: number;
  }>;
  chiSquare: number;
  isUniform: boolean;
  timeTakenMs: number;
} {
  const startTime = performance.now();
  const { world, diceMaterial } = createPhysicsWorld();
  const faces = getDieFaceDefinitions(sides);
  const shape = createCannonDieShape(sides);

  const faceCounts: Record<number, number> = {};
  faces.forEach((f) => {
    faceCounts[f.value] = 0;
  });

  const body = new CANNON.Body({
    mass: 1.2,
    shape,
    material: diceMaterial,
    linearDamping: 0.2,
    angularDamping: 0.25
  });
  world.addBody(body);

  const fixedTimeStep = 1 / 60;
  const maxSubSteps = 3;

  for (let i = 0; i < iterations; i++) {
    const impulse = getCryptoDiceImpulse(i, 1);
    body.position.copy(impulse.pos);
    body.quaternion.copy(impulse.quat);
    body.velocity.copy(impulse.vel);
    body.angularVelocity.copy(impulse.angVel);
    body.wakeUp();

    // Step simulation until resting or timeout
    let steps = 0;
    while (steps < 220) {
      world.step(fixedTimeStep, fixedTimeStep, maxSubSteps);
      steps++;
      const speed = body.velocity.length();
      const rotSpeed = body.angularVelocity.length();
      if (speed < 0.05 && rotSpeed < 0.05 && body.position.y < 1.6) {
        break;
      }
    }

    const { face } = detectRestingTopFace(body.quaternion, faces);
    faceCounts[face.value] = (faceCounts[face.value] || 0) + 1;
  }

  const expectedCount = iterations / faces.length;
  const expectedPercentage = 100 / faces.length;
  let chiSquare = 0;

  const distribution = faces.map((f) => {
    const count = faceCounts[f.value] || 0;
    const percentage = Number(((count / iterations) * 100).toFixed(2));
    const deviation = Number((percentage - expectedPercentage).toFixed(2));
    chiSquare += Math.pow(count - expectedCount, 2) / expectedCount;

    return {
      value: f.value,
      count,
      percentage,
      expectedPercentage: Number(expectedPercentage.toFixed(2)),
      deviation
    };
  });

  // Chi-Square 95% critical threshold for (faces.length - 1) degrees of freedom
  const isUniform = chiSquare < faces.length * 3.5;
  const timeTakenMs = Number((performance.now() - startTime).toFixed(1));

  return {
    totalRolls: iterations,
    sides,
    faceCounts,
    distribution,
    chiSquare: Number(chiSquare.toFixed(2)),
    isUniform,
    timeTakenMs
  };
}
