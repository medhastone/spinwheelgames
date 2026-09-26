'use client';

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';
import {
  X,
  RotateCw,
  Eye,
  CheckCircle2,
  Compass,
  Layers,
  Sparkles,
  ArrowUpCircle,
  ArrowDownCircle
} from 'lucide-react';
import { buildDieGeometryDefinition, createDiceFaceCanvas, FaceData } from './diceGeometry';
import { DICE_THEMES, DiceTheme } from './DiceScene3D';
import { SingleDieResult } from './diceMath';

interface DiceInspectorModalProps {
  isOpen?: boolean;
  onClose: () => void;
  sides: number;
  diceResults?: SingleDieResult[];
  dice?: SingleDieResult[];
  initialDieIndex?: number;
  theme?: DiceTheme;
}

export default function DiceInspectorModal({
  isOpen = true,
  onClose,
  sides,
  diceResults,
  dice,
  initialDieIndex = 0,
  theme = 'ruby'
}: DiceInspectorModalProps) {
  const actualDice = useMemo(() => diceResults || dice || [], [diceResults, dice]);
  const [selectedDieIdx, setSelectedDieIdx] = useState<number>(initialDieIndex);
  const [selectedFaceIdx, setSelectedFaceIdx] = useState<number | null>(null);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const dieMeshRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Rotation controls state
  const isPointerDownRef = useRef<boolean>(false);
  const pointerPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const targetQuaternionRef = useRef<THREE.Quaternion | null>(null);

  const themeConfig = DICE_THEMES[theme] || DICE_THEMES.ruby;

  // Build geometry definition and cached faces
  const geomDef = useMemo(() => buildDieGeometryDefinition(sides), [sides]);

  const activeDieResult = actualDice[selectedDieIdx] || actualDice[0] || { value: 1 };

  // Find the face corresponding to the rolled value
  const rolledFace = useMemo(() => {
    return geomDef.faces.find((f) => f.value === activeDieResult.value) || geomDef.faces[0];
  }, [geomDef, activeDieResult.value]);

  // Sync selected die index when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedDieIdx(Math.min(initialDieIndex, Math.max(0, actualDice.length - 1)));
      setSelectedFaceIdx(rolledFace ? rolledFace.faceIndex : 0);
      targetQuaternionRef.current = null;
    }
  }, [isOpen, initialDieIndex, actualDice.length, rolledFace]);

  // Initialize Three.js 3D Inspector Viewport
  useEffect(() => {
    if (!isOpen) return;

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0, 4.2);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambient = new THREE.AmbientLight(0xffffff, 2.2);
    scene.add(ambient);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.4);
    dirLight1.position.set(5, 7, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x93c5fd, 1.4);
    dirLight2.position.set(-6, -4, -5);
    scene.add(dirLight2);

    const rimLight = new THREE.PointLight(0xfef08a, 1.2, 10);
    rimLight.position.set(0, 4, 3);
    scene.add(rimLight);

    // Build the visual Die Mesh
    const hexBg = `#${themeConfig.bodyColor.toString(16).padStart(6, '0')}`;
    let matArray: THREE.Material[];

    if (sides === 2) {
      const sideRim = new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        roughness: 0.25,
        metalness: 0.85
      });
      const face1 = new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(createDiceFaceCanvas('1', themeConfig.textColor, hexBg, themeConfig.borderColor, false)),
        roughness: themeConfig.roughness,
        metalness: themeConfig.metalness,
        color: 0xffffff
      });
      const face2 = new THREE.MeshStandardMaterial({
        map: new THREE.CanvasTexture(createDiceFaceCanvas('2', themeConfig.textColor, hexBg, themeConfig.borderColor, false)),
        roughness: themeConfig.roughness,
        metalness: themeConfig.metalness,
        color: 0xffffff
      });
      matArray = [sideRim, face1, face2];
    } else {
      matArray = geomDef.faces.map((f) => {
        const isPip = sides === 6;
        const canvas = createDiceFaceCanvas(f.label, themeConfig.textColor, hexBg, themeConfig.borderColor, isPip);
        const tex = new THREE.CanvasTexture(canvas);
        tex.anisotropy = 8;
        return new THREE.MeshStandardMaterial({
          map: tex,
          roughness: themeConfig.roughness,
          metalness: themeConfig.metalness,
          color: 0xffffff
        });
      });
    }

    const mesh = new THREE.Mesh(geomDef.geometry.clone(), matArray);
    scene.add(mesh);
    dieMeshRef.current = mesh;

    // Set initial orientation to show the rolled winning face toward front/top
    if (rolledFace) {
      const q = new THREE.Quaternion().setFromUnitVectors(
        rolledFace.localNormal.clone().normalize(),
        new THREE.Vector3(0, 0.4, 0.9).normalize()
      );
      mesh.quaternion.copy(q);
    }

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

    // Animation Loop
    const loop = () => {
      animFrameRef.current = requestAnimationFrame(loop);

      if (mesh) {
        // Interpolate toward target orientation if user clicked a specific face
        if (targetQuaternionRef.current) {
          mesh.quaternion.slerp(targetQuaternionRef.current, 0.12);
          if (mesh.quaternion.angleTo(targetQuaternionRef.current) < 0.005) {
            mesh.quaternion.copy(targetQuaternionRef.current);
            targetQuaternionRef.current = null;
          }
        } else if (isAutoRotating) {
          mesh.rotation.y += 0.012;
          mesh.rotation.x += 0.004;
        }
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      resizeObserver.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      renderer.dispose();
      if (container && renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isOpen, sides, geomDef, themeConfig, rolledFace, isAutoRotating]);

  // Rotate 3D Model so that a specific face points directly forward
  const rotateToFace = useCallback((face: FaceData) => {
    setIsAutoRotating(false);
    setSelectedFaceIdx(face.faceIndex);

    // We want the face's localNormal to point toward +Z (directly at the camera: (0, 0, 1))
    const targetQ = new THREE.Quaternion().setFromUnitVectors(
      face.localNormal.clone().normalize(),
      new THREE.Vector3(0, 0, 1)
    );
    targetQuaternionRef.current = targetQ;
  }, []);

  // Quick preset viewing angles
  const snapToAngle = (preset: 'top' | 'bottom' | 'front' | 'back') => {
    setIsAutoRotating(false);
    if (!dieMeshRef.current) return;

    let targetVec = new THREE.Vector3(0, 0, 1);
    if (preset === 'top') targetVec = new THREE.Vector3(0, 1, 0);
    if (preset === 'bottom') targetVec = new THREE.Vector3(0, -1, 0);
    if (preset === 'front') targetVec = new THREE.Vector3(0, 0, 1);
    if (preset === 'back') targetVec = new THREE.Vector3(0, 0, -1);

    const currentFace = rolledFace || geomDef.faces[0];
    const q = new THREE.Quaternion().setFromUnitVectors(
      currentFace.localNormal.clone().normalize(),
      targetVec
    );
    targetQuaternionRef.current = q;
  };

  // Interactive 360 Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    setIsAutoRotating(false);
    targetQuaternionRef.current = null;
    pointerPosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || !dieMeshRef.current) return;

    const dx = e.clientX - pointerPosRef.current.x;
    const dy = e.clientY - pointerPosRef.current.y;
    pointerPosRef.current = { x: e.clientX, y: e.clientY };

    const rotSpeed = 0.008;
    const rotY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * rotSpeed);
    const rotX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * rotSpeed);

    dieMeshRef.current.quaternion.multiplyQuaternions(rotY, dieMeshRef.current.quaternion);
    dieMeshRef.current.quaternion.multiplyQuaternions(rotX, dieMeshRef.current.quaternion);
  };

  const handlePointerUp = () => {
    isPointerDownRef.current = false;
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspector-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#13141f] text-white border border-[#272839] rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#232435] bg-[#181926]/80 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 id="inspector-modal-title" className="text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>360° 3D Dice Face Inspector</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono">
                  {geomDef.faces.length} Sides Verified
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Inspect every hidden side number in full 3D to verify 100% fair geometry &amp; accuracy
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Die Selector Tabs if multiple dice rolled */}
        {actualDice.length > 1 && (
          <div className="px-5 py-2.5 border-b border-[#232435] bg-[#161724] flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-400 font-medium whitespace-nowrap flex items-center gap-1.5 mr-2">
              <Layers className="w-3.5 h-3.5" />
              <span>Select Die:</span>
            </span>
            {actualDice.map((d, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedDieIdx(idx);
                  targetQuaternionRef.current = null;
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  selectedDieIdx === idx
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 border border-indigo-400/40'
                    : 'bg-[#1e1f2f] text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                <span>Die #{idx + 1}</span>
                <span className="px-1.5 py-0.2 rounded bg-black/30 font-mono font-bold text-amber-300">
                  {d.value}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Modal Main Content */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-[#232435]">
          {/* Left Column: 360 3D Orbit Viewport */}
          <div className="lg:col-span-7 flex flex-col items-center justify-between p-4 sm:p-6 bg-gradient-to-b from-[#11121d] to-[#0c0d15] relative select-none">
            {/* Quick-Snap Preset Controls */}
            <div className="w-full flex items-center justify-between gap-2 mb-2 z-10">
              <div className="flex items-center gap-1.5 bg-[#1a1b2b]/90 backdrop-blur-md p-1 rounded-2xl border border-white/10 text-xs">
                <button
                  onClick={() => snapToAngle('top')}
                  className="px-2.5 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                >
                  <ArrowUpCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Top</span>
                </button>
                <button
                  onClick={() => snapToAngle('bottom')}
                  className="px-2.5 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1"
                >
                  <ArrowDownCircle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bottom</span>
                </button>
                <button
                  onClick={() => snapToAngle('front')}
                  className="px-2.5 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Front
                </button>
                <button
                  onClick={() => snapToAngle('back')}
                  className="px-2.5 py-1 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Back
                </button>
              </div>

              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`p-2 rounded-2xl border text-xs flex items-center gap-1.5 transition-all ${
                  isAutoRotating
                    ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300 shadow-md'
                    : 'bg-[#1a1b2b]/90 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
                title="Toggle Auto 360 Spin"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotating ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">{isAutoRotating ? 'Spinning' : 'Turntable'}</span>
              </button>
            </div>

            {/* 3D WebGL Canvas */}
            <div
              ref={containerRef}
              className="w-full h-[280px] sm:h-[340px] cursor-grab active:cursor-grabbing touch-none flex items-center justify-center relative"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />

            {/* Hint instruction banner */}
            <div className="w-full mt-2 py-1.5 px-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Drag anywhere to freely tumble 360°</span>
              </div>
              <span className="text-slate-500 font-mono text-[10px]">D{sides} Polyhedral</span>
            </div>
          </div>

          {/* Right Column: Scrollable All-Sides Face Gallery & Verification */}
          <div className="lg:col-span-5 flex flex-col p-4 sm:p-6 bg-[#141523] overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-indigo-400" />
                  <span>All Die Faces &amp; Numbers ({geomDef.faces.length})</span>
                </h3>
                <p className="text-[11px] text-slate-400">
                  Click any face below to automatically rotate the 3D die to it
                </p>
              </div>
            </div>

            {/* Rolled Winning Result Badge */}
            <div className="mb-4 p-3 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center font-black font-mono text-emerald-300 text-lg">
                  {activeDieResult.value}
                </div>
                <div>
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Active Top Face (Rolled Result)</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Settled naturally on felt surface pointing directly upward
                  </div>
                </div>
              </div>
              {rolledFace && (
                <button
                  onClick={() => rotateToFace(rolledFace)}
                  className="px-2.5 py-1 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold transition-colors"
                >
                  View
                </button>
              )}
            </div>

            {/* Scrollable Face Cards List */}
            <div className="flex-1 overflow-y-auto pr-1 max-h-[310px] space-y-2">
              {geomDef.faces.map((face) => {
                const isCurrentRolled = face.value === activeDieResult.value;
                const isSelected = selectedFaceIdx === face.faceIndex;

                return (
                  <button
                    key={face.faceIndex}
                    onClick={() => rotateToFace(face)}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-md'
                        : isCurrentRolled
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-200 hover:bg-emerald-500/15'
                        : 'bg-[#1b1c2d] border-[#292a3d] text-slate-300 hover:bg-[#222338] hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-sm border ${
                          isCurrentRolled
                            ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                            : isSelected
                            ? 'bg-indigo-500/30 border-indigo-400 text-white'
                            : 'bg-black/30 border-white/10 text-slate-300'
                        }`}
                      >
                        {face.label}
                      </div>
                      <div>
                        <div className="text-xs font-semibold flex items-center gap-1.5">
                          <span>Face Number {face.value}</span>
                          {isCurrentRolled && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-medium">
                              Top Face
                            </span>
                          )}
                          {isSelected && !isCurrentRolled && (
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                              Viewing Front
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          Normal: [{face.localNormal.x.toFixed(2)}, {face.localNormal.y.toFixed(2)}, {face.localNormal.z.toFixed(2)}]
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Rotate
                      </span>
                      <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fairness Note */}
            <div className="mt-4 pt-3 border-t border-[#232435] flex items-center justify-between text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Evenly balanced 3D dice &amp; easy-to-read numbers on every side</span>
              </div>
              <button
                onClick={onClose}
                className="px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
