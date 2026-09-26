'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { playDiceRollSound, playDiceSettleSound } from '@/lib/sound';
import { buildDieGeometryDefinition, createDiceFaceCanvas } from './diceGeometry';
import { DicePhysicsEngine, RollTelemetry } from './cannonPhysics';
import { SingleDieResult } from './diceMath';

export type DiceTheme =
  | 'ruby'
  | 'sapphire'
  | 'emerald'
  | 'purple'
  | 'cyan'
  | 'amber'
  | 'magenta'
  | 'silvergold'
  | 'cobalt'
  | 'obsidian'
  | 'ivory'
  | 'crystal'
  | 'rainbow';

export interface DiceThemeConfig {
  name: string;
  bodyColor: number;
  textColor: string;
  borderColor: string;
  roughness: number;
  metalness: number;
  transmission?: number;
  ior?: number;
  opacity?: number;
}

export const DICE_THEMES: Record<DiceTheme, DiceThemeConfig> = {
  ruby: {
    name: 'Ruby Gemstone',
    bodyColor: 0xdc2626,
    textColor: '#fef08a',
    borderColor: '#ef4444',
    roughness: 0.12,
    metalness: 0.1
  },
  sapphire: {
    name: 'Sapphire Crystal',
    bodyColor: 0x1d4ed8,
    textColor: '#fef08a',
    borderColor: '#3b82f6',
    roughness: 0.12,
    metalness: 0.1
  },
  emerald: {
    name: 'Emerald Jade',
    bodyColor: 0x047857,
    textColor: '#fef08a',
    borderColor: '#10b981',
    roughness: 0.12,
    metalness: 0.1
  },
  purple: {
    name: 'Amethyst Crystal',
    bodyColor: 0x6d28d9,
    textColor: '#fef08a',
    borderColor: '#8b5cf6',
    roughness: 0.12,
    metalness: 0.1
  },
  cyan: {
    name: 'Cyan Diamond',
    bodyColor: 0x0284c7,
    textColor: '#fef08a',
    borderColor: '#06b6d4',
    roughness: 0.12,
    metalness: 0.1
  },
  amber: {
    name: 'Amber Gold',
    bodyColor: 0xd97706,
    textColor: '#ffffff',
    borderColor: '#f59e0b',
    roughness: 0.12,
    metalness: 0.2
  },
  magenta: {
    name: 'Magenta Ruby',
    bodyColor: 0xbe185d,
    textColor: '#fef08a',
    borderColor: '#ec4899',
    roughness: 0.12,
    metalness: 0.1
  },
  silvergold: {
    name: 'Metallic Silver & Gold',
    bodyColor: 0x94a3b8,
    textColor: '#fef08a',
    borderColor: '#fbbf24',
    roughness: 0.18,
    metalness: 0.85
  },
  cobalt: {
    name: 'Royal Cobalt',
    bodyColor: 0x2563eb,
    textColor: '#ffffff',
    borderColor: '#3b82f6',
    roughness: 0.15,
    metalness: 0.1
  },
  obsidian: {
    name: 'Onyx Obsidian',
    bodyColor: 0x18181b,
    textColor: '#fbbf24',
    borderColor: '#27272a',
    roughness: 0.18,
    metalness: 0.15
  },
  ivory: {
    name: 'Classic Ivory',
    bodyColor: 0xfffbeb,
    textColor: '#18181b',
    borderColor: '#fef3c7',
    roughness: 0.22,
    metalness: 0.05
  },
  crystal: {
    name: 'Transparent Crystal',
    bodyColor: 0xffffff,
    textColor: '#1e293b',
    borderColor: '#94a3b8',
    roughness: 0.05,
    metalness: 0.05,
    transmission: 0.75,
    ior: 1.5,
    opacity: 0.92
  },
  rainbow: {
    name: 'Rainbow Party',
    bodyColor: 0xea580c,
    textColor: '#ffffff',
    borderColor: '#f97316',
    roughness: 0.15,
    metalness: 0.1
  }
};

const RAINBOW_PALETTE = [0xdc2626, 0x059669, 0x2563eb, 0x0891b2, 0xd97706, 0x7c3aed, 0xea580c];

interface DiceScene3DProps {
  dice: SingleDieResult[];
  sides: number;
  count?: number;
  isRolling: boolean;
  theme?: DiceTheme;
  soundEnabled?: boolean;
  onPhysicsRollComplete?: (settledResults: SingleDieResult[]) => void;
  onAnimationComplete?: () => void;
  onTelemetryUpdate?: (telemetry: RollTelemetry[]) => void;
  onManualThrowTrigger?: () => void;
  className?: string;
}

const textureCache = new Map<string, THREE.CanvasTexture>();

function getOrCreateTexture(
  valStr: string,
  textColor: string,
  bgColor: string,
  borderColor: string,
  isPipMode = false
): THREE.CanvasTexture {
  const key = `${valStr}-${textColor}-${bgColor}-${borderColor}-${isPipMode}`;
  if (textureCache.has(key)) {
    return textureCache.get(key)!;
  }

  const canvas = createDiceFaceCanvas(valStr, textColor, bgColor, borderColor, isPipMode);
  const tex = new THREE.CanvasTexture(canvas);
  tex.anisotropy = 8;
  textureCache.set(key, tex);
  return tex;
}

export default function DiceScene3D({
  dice,
  sides,
  count = 1,
  isRolling,
  theme = 'ruby',
  soundEnabled = true,
  onPhysicsRollComplete,
  onAnimationComplete,
  onTelemetryUpdate,
  onManualThrowTrigger,
  className = ''
}: DiceScene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const diceMeshesRef = useRef<THREE.Mesh[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const physicsEngineRef = useRef<DicePhysicsEngine | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const isSimulatingRef = useRef<boolean>(false);

  // Track if dice have naturally settled to preserve their exact landing positions
  const hasSettledPhysicsRef = useRef<boolean>(false);
  const lastRenderedConfigRef = useRef<string>('');

  const cameraTargetRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 0));
  const cameraPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 11.5, 10.5));

  const lastImpactSoundTimeRef = useRef<number>(0);
  const dragStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const themeConfig = DICE_THEMES[theme] || DICE_THEMES.ruby;

  const handlePhysicsImpact = useCallback(
    (volume: number) => {
      if (!soundEnabled) return;
      const now = performance.now();
      if (now - lastImpactSoundTimeRef.current < 110) return; // Prevent audio machine-gunning
      lastImpactSoundTimeRef.current = now;
      playDiceSettleSound(Math.min(0.85, Math.max(0.25, volume * 0.75)));
    },
    [soundEnabled]
  );

  // Initialize Three.js Scene, Studio Lighting & Visible 3D Wooden Dice Tray
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.copy(cameraPosRef.current);
    camera.lookAt(cameraTargetRef.current);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    const mainSpot = new THREE.DirectionalLight(0xffffff, 2.8);
    mainSpot.position.set(5, 15, 8);
    mainSpot.castShadow = true;
    mainSpot.shadow.mapSize.width = 2048;
    mainSpot.shadow.mapSize.height = 2048;
    mainSpot.shadow.camera.near = 1;
    mainSpot.shadow.camera.far = 30;
    mainSpot.shadow.bias = -0.0004;
    scene.add(mainSpot);

    const rimLight = new THREE.DirectionalLight(0xe0f2fe, 1.4);
    rimLight.position.set(-8, 12, -7);
    scene.add(rimLight);

    const warmFill = new THREE.DirectionalLight(0xfef08a, 0.9);
    warmFill.position.set(0, -4, 10);
    scene.add(warmFill);

    // Visible 3D Luxury Wooden Tray with Rich Felt Bed
    const trayWidth = 13.0;
    const trayDepth = 10.5;
    const wallHeight = 1.6;
    const wallThickness = 0.65;

    // Felt Bed Base
    const feltGeo = new THREE.PlaneGeometry(trayWidth, trayDepth);
    const feltMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Deep luxury velvet felt
      roughness: 0.88,
      metalness: 0.05
    });
    const feltFloor = new THREE.Mesh(feltGeo, feltMat);
    feltFloor.rotation.x = -Math.PI / 2;
    feltFloor.position.y = 0;
    feltFloor.receiveShadow = true;
    scene.add(feltFloor);

    // Inner tray gold trim line
    const trimGeo = new THREE.RingGeometry(5.2, 5.3, 4);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.2,
      metalness: 0.8
    });
    const trim = new THREE.Mesh(trimGeo, trimMat);
    trim.rotation.x = -Math.PI / 2;
    trim.position.y = 0.01;
    scene.add(trim);

    // 4 Wooden Perimeter Walls
    const woodMat = new THREE.MeshStandardMaterial({
      color: 0x2e1a0e, // Dark Walnut / Mahogany
      roughness: 0.35,
      metalness: 0.15
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Antique Brass corner brackets
      roughness: 0.25,
      metalness: 0.85
    });

    const halfW = trayWidth / 2;
    const halfD = trayDepth / 2;
    const halfH = wallHeight / 2;

    // North & South Walls
    const nsGeo = new THREE.BoxGeometry(trayWidth + wallThickness * 2, wallHeight, wallThickness);
    const northWall = new THREE.Mesh(nsGeo, woodMat);
    northWall.position.set(0, halfH, halfD + wallThickness / 2);
    northWall.castShadow = true;
    northWall.receiveShadow = true;
    scene.add(northWall);

    const southWall = new THREE.Mesh(nsGeo, woodMat);
    southWall.position.set(0, halfH, -halfD - wallThickness / 2);
    southWall.castShadow = true;
    southWall.receiveShadow = true;
    scene.add(southWall);

    // East & West Walls
    const ewGeo = new THREE.BoxGeometry(wallThickness, wallHeight, trayDepth);
    const eastWall = new THREE.Mesh(ewGeo, woodMat);
    eastWall.position.set(halfW + wallThickness / 2, halfH, 0);
    eastWall.castShadow = true;
    eastWall.receiveShadow = true;
    scene.add(eastWall);

    const westWall = new THREE.Mesh(ewGeo, woodMat);
    westWall.position.set(-halfW - wallThickness / 2, halfH, 0);
    westWall.castShadow = true;
    westWall.receiveShadow = true;
    scene.add(westWall);

    // 4 Brass Corner Brackets
    const cornerGeo = new THREE.BoxGeometry(wallThickness * 1.2, wallHeight * 1.05, wallThickness * 1.2);
    const corners = [
      [halfW + wallThickness / 2, halfD + wallThickness / 2],
      [-halfW - wallThickness / 2, halfD + wallThickness / 2],
      [halfW + wallThickness / 2, -halfD - wallThickness / 2],
      [-halfW - wallThickness / 2, -halfD - wallThickness / 2]
    ];
    corners.forEach(([cx, cz]) => {
      const cornerMesh = new THREE.Mesh(cornerGeo, brassMat);
      cornerMesh.position.set(cx, halfH, cz);
      cornerMesh.castShadow = true;
      scene.add(cornerMesh);
    });

    const physicsEngine = new DicePhysicsEngine(handlePhysicsImpact);
    physicsEngineRef.current = physicsEngine;

    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    renderer.render(scene, camera);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [handlePhysicsImpact]);

  // Build Three.js visual meshes matching physics bodies
  const rebuildVisualMeshes = useCallback(
    (numDice: number, curSides: number) => {
      const scene = sceneRef.current;
      if (!scene) return;

      diceMeshesRef.current.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });
      diceMeshesRef.current = [];

      const geomDef = buildDieGeometryDefinition(curSides);

      for (let i = 0; i < numDice; i++) {
        const curColor =
          theme === 'rainbow'
            ? RAINBOW_PALETTE[i % RAINBOW_PALETTE.length]
            : themeConfig.bodyColor;
        const hexBg = `#${curColor.toString(16).padStart(6, '0')}`;

        let matArray: THREE.Material[];

        if (curSides === 2) {
          const sideRim = new THREE.MeshStandardMaterial({
            color: 0x94a3b8,
            roughness: 0.25,
            metalness: 0.85
          });
          const face1 = new THREE.MeshStandardMaterial({
            map: getOrCreateTexture('1', themeConfig.textColor, hexBg, themeConfig.borderColor, false),
            roughness: themeConfig.roughness,
            metalness: themeConfig.metalness,
            color: 0xffffff
          });
          const face2 = new THREE.MeshStandardMaterial({
            map: getOrCreateTexture('2', themeConfig.textColor, hexBg, themeConfig.borderColor, false),
            roughness: themeConfig.roughness,
            metalness: themeConfig.metalness,
            color: 0xffffff
          });
          matArray = [sideRim, face1, face2];
        } else {
          matArray = geomDef.faces.map((f) => {
            const isPip = curSides === 6;
            const tex = getOrCreateTexture(f.label, themeConfig.textColor, hexBg, themeConfig.borderColor, isPip);
            return new THREE.MeshStandardMaterial({
              map: tex,
              roughness: themeConfig.roughness,
              metalness: themeConfig.metalness,
              color: 0xffffff
            });
          });
        }

        const mesh = new THREE.Mesh(geomDef.geometry.clone(), matArray);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        diceMeshesRef.current.push(mesh);
      }
    },
    [theme, themeConfig]
  );

  // Trigger Physical Dice Throw
  const executePhysicalRoll = useCallback(
    (dragImpulse?: { x: number; y: number; z: number }) => {
      const physics = physicsEngineRef.current;
      const scene = sceneRef.current;
      const camera = cameraRef.current;
      if (!physics || !scene || !camera) return;

      const numDice = Math.max(1, Math.min(count, 20));
      rebuildVisualMeshes(numDice, sides);

      // Keep camera fixed and rock-solid: table never moves, tilts or slides
      camera.position.set(0, 11.2, 10.5);
      camera.lookAt(0, 0, 0);

      const bodies = physics.spawnAndThrowDice(numDice, sides, dragImpulse);

      if (soundEnabled) {
        playDiceRollSound(0.75);
      }

      isSimulatingRef.current = true;
      hasSettledPhysicsRef.current = false;
      lastTimeRef.current = performance.now();

      const loop = (now: number) => {
        const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
        lastTimeRef.current = now;

        const allSettled = physics.step(dt);

        bodies.forEach((dInst, idx) => {
          const mesh = diceMeshesRef.current[idx];
          if (mesh) {
            mesh.position.copy(dInst.body.position as unknown as THREE.Vector3);
            mesh.quaternion.copy(dInst.body.quaternion as unknown as THREE.Quaternion);
          }
        });

        // Ensure camera remains rock-solid stationary
        if (cameraRef.current) {
          cameraRef.current.position.set(0, 11.2, 10.5);
          cameraRef.current.lookAt(0, 0, 0);
        }

        if (onTelemetryUpdate) {
          onTelemetryUpdate(physics.getTelemetry());
        }

        if (rendererRef.current && cameraRef.current && sceneRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }

        if (!allSettled) {
          animFrameRef.current = requestAnimationFrame(loop);
        } else {
          isSimulatingRef.current = false;
          hasSettledPhysicsRef.current = true; // Mark as settled so positions are preserved

          const settledResults: SingleDieResult[] = bodies.map((dInst) => ({
            value: dInst.lastUpwardResult.value,
            originalValue: dInst.lastUpwardResult.value,
            isDropped: false
          }));

          // Delayed settle sound removed: contact impacts play in real-time on actual contact

          if (onPhysicsRollComplete) {
            onPhysicsRollComplete(settledResults);
          }
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      };

      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = requestAnimationFrame(loop);
    },
    [count, sides, rebuildVisualMeshes, soundEnabled, onPhysicsRollComplete, onAnimationComplete, onTelemetryUpdate]
  );

  useEffect(() => {
    if (isRolling && !isSimulatingRef.current) {
      executePhysicalRoll();
    }
  }, [isRolling, executePhysicalRoll]);

  // Initial resting render: ONLY rearrange if config changed and NOT right after a physical roll!
  useEffect(() => {
    const currentConfigKey = `${sides}-${count}-${theme}`;

    // If we just settled from a physical roll, keep the dice right where they landed!
    if (hasSettledPhysicsRef.current) {
      if (lastRenderedConfigRef.current === currentConfigKey) {
        return;
      }
    }

    if (!isRolling && !isSimulatingRef.current) {
      lastRenderedConfigRef.current = currentConfigKey;
      hasSettledPhysicsRef.current = false;

      const numDice = Math.max(1, dice.length || count);
      rebuildVisualMeshes(numDice, sides);

      // Natural scattered spatial arrangement across the felt bed without clumping
      const spacing = numDice > 6 ? 2.2 : 2.6;
      const cols = Math.min(Math.ceil(Math.sqrt(numDice)), 4);
      const rows = Math.ceil(numDice / cols);

      diceMeshesRef.current.forEach((mesh, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const x = (c - (cols - 1) / 2) * spacing;
        const z = (r - (rows - 1) / 2) * spacing;
        const y = sides === 2 ? 0.18 : 0.68;

        mesh.position.set(x, y, z);
        mesh.rotation.set(0, 0, 0);
      });

      if (cameraRef.current) {
        cameraRef.current.position.set(0, 11.2, 10.5);
        cameraRef.current.lookAt(0, 0, 0);
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    }
  }, [dice, sides, count, theme, rebuildVisualMeshes, isRolling]);

  // Interactive Mouse / Touch Drag-and-Flick Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isSimulatingRef.current) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now()
    };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging || !dragStartRef.current) return;
    setIsDragging(false);

    const start = dragStartRef.current;
    const elapsed = Math.max(10, performance.now() - start.time);
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 25 && elapsed < 800) {
      const speed = Math.min(14, (dist / elapsed) * 18);
      const impulseX = (dx / dist) * speed;
      const impulseZ = (dy / dist) * speed;
      const impulseY = -Math.abs(speed * 0.5);

      if (onManualThrowTrigger) {
        onManualThrowTrigger();
      }
      executePhysicalRoll({ x: impulseX, y: impulseY, z: impulseZ });
    }
    dragStartRef.current = null;
  };

  return (
    <div
      className={`relative w-full h-full min-h-[320px] sm:min-h-[420px] lg:min-h-[480px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0e0f17] via-[#12131e] to-[#090a10] border border-[#222330] shadow-inner select-none ${className}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {/* 3D WebGL Canvas Container */}
      <div
        ref={containerRef}
        className="w-full h-full cursor-grab active:cursor-grabbing touch-none"
        aria-hidden="true"
      />

      {/* Decorative Arena Vignette */}
      <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-indigo-500/10 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />

      {/* Tray Badge */}
      <div className="absolute top-3 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] uppercase font-mono tracking-widest text-slate-300 pointer-events-none flex items-center gap-1.5 shadow-md">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>3D Wooden Tray · Drag &amp; Flick to Throw</span>
      </div>
    </div>
  );
}
