import * as THREE from 'three';
import * as CANNON from 'cannon-es';

export interface FaceData {
  faceIndex: number;
  value: number;
  label: string;
  localNormal: THREE.Vector3;
  centroid: THREE.Vector3;
}

export interface DieGeometryDefinition {
  geometry: THREE.BufferGeometry;
  cannonShape: CANNON.Shape;
  faces: FaceData[];
  radius: number;
}

// Convert Three.js BufferGeometry to CANNON.ConvexPolyhedron with vertex deduplication
export function createCannonConvexPolyhedron(geo: THREE.BufferGeometry): CANNON.ConvexPolyhedron {
  const posAttr = geo.attributes.position;
  const vertices: CANNON.Vec3[] = [];
  const faces: number[][] = [];

  const precision = 10000;
  const vertexMap = new Map<string, number>();

  for (let i = 0; i < posAttr.count; i++) {
    const x = Math.round(posAttr.getX(i) * precision) / precision;
    const y = Math.round(posAttr.getY(i) * precision) / precision;
    const z = Math.round(posAttr.getZ(i) * precision) / precision;
    const key = `${x}_${y}_${z}`;

    if (!vertexMap.has(key)) {
      vertexMap.set(key, vertices.length);
      vertices.push(new CANNON.Vec3(x, y, z));
    }
  }

  for (let i = 0; i < posAttr.count; i += 3) {
    const p1 = `${Math.round(posAttr.getX(i) * precision) / precision}_${Math.round(posAttr.getY(i) * precision) / precision}_${Math.round(posAttr.getZ(i) * precision) / precision}`;
    const p2 = `${Math.round(posAttr.getX(i + 1) * precision) / precision}_${Math.round(posAttr.getY(i + 1) * precision) / precision}_${Math.round(posAttr.getZ(i + 1) * precision) / precision}`;
    const p3 = `${Math.round(posAttr.getX(i + 2) * precision) / precision}_${Math.round(posAttr.getY(i + 2) * precision) / precision}_${Math.round(posAttr.getZ(i + 2) * precision) / precision}`;

    const idx1 = vertexMap.get(p1)!;
    const idx2 = vertexMap.get(p2)!;
    const idx3 = vertexMap.get(p3)!;

    if (idx1 !== idx2 && idx2 !== idx3 && idx3 !== idx1) {
      faces.push([idx1, idx2, idx3]);
    }
  }

  return new CANNON.ConvexPolyhedron({
    vertices,
    faces
  });
}

// Generate PBR textured canvas for face rendering with crisp numerals and pips
export function createDiceFaceCanvas(
  valStr: string,
  textColor: string,
  bgColor: string,
  borderColor: string,
  isPipMode = false
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  // Background Fill with acrylic / pearlescent radial vignette
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, 512, 512);

  const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 290);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
  grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.08)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Outer bevel / chamfer border line
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 16;
  ctx.strokeRect(16, 16, 480, 480);

  const numericVal = parseInt(valStr, 10);
  if (isPipMode && !isNaN(numericVal) && numericVal >= 1 && numericVal <= 6) {
    const radius = 42;
    const positions: Record<number, Array<[number, number]>> = {
      1: [[256, 256]],
      2: [[144, 144], [368, 368]],
      3: [[144, 144], [256, 256], [368, 368]],
      4: [[144, 144], [368, 144], [144, 368], [368, 368]],
      5: [[144, 144], [368, 144], [256, 256], [144, 368], [368, 368]],
      6: [[144, 136], [368, 136], [144, 256], [368, 256], [144, 376], [368, 376]]
    };
    const pips = positions[numericVal] || positions[1];
    pips.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y + 4, radius + 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = textColor;
      ctx.fill();

      const pipGrad = ctx.createRadialGradient(x - 10, y - 10, 4, x, y, radius);
      pipGrad.addColorStop(0, 'rgba(255, 255, 255, 0.7)');
      pipGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = pipGrad;
      ctx.fill();
    });
  } else {
    ctx.font = '900 200px "Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 8;

    ctx.lineWidth = 14;
    ctx.strokeStyle = '#451a03';
    ctx.strokeText(valStr, 256, 268);

    const textGrad = ctx.createLinearGradient(256, 140, 256, 380);
    textGrad.addColorStop(0, '#fffbeb');
    textGrad.addColorStop(0.35, '#fef08a');
    textGrad.addColorStop(0.7, '#f59e0b');
    textGrad.addColorStop(1, '#d97706');

    ctx.fillStyle = textGrad;
    ctx.fillText(valStr, 256, 268);

    if (valStr === '6' || valStr === '9') {
      ctx.fillStyle = textGrad;
      ctx.fillRect(200, 400, 112, 16);
    }
  }

  return canvas;
}

// Build exact geometry, Cannon collision shape, and face normal vectors for all dice types
export function buildDieGeometryDefinition(sides: number): DieGeometryDefinition {
  switch (sides) {
    case 2: {
      // D2 Metallic Coin Disc
      const radius = 1.25;
      const height = 0.35;
      const geo = new THREE.CylinderGeometry(radius, radius, height, 32);
      const cannonShape = new CANNON.Cylinder(radius, radius, height, 24);

      const faces: FaceData[] = [
        {
          faceIndex: 1,
          value: 1,
          label: '1',
          localNormal: new THREE.Vector3(0, 1, 0),
          centroid: new THREE.Vector3(0, height / 2, 0)
        },
        {
          faceIndex: 2,
          value: 2,
          label: '2',
          localNormal: new THREE.Vector3(0, -1, 0),
          centroid: new THREE.Vector3(0, -height / 2, 0)
        }
      ];

      return { geometry: geo, cannonShape, faces, radius };
    }

    case 3:
    case 4: {
      // D4 Tetrahedron
      const radius = 1.35;
      const geo = new THREE.TetrahedronGeometry(radius);
      geo.computeVertexNormals();

      const pos = geo.attributes.position;
      const uvs = new Float32Array(pos.count * 2);
      geo.clearGroups();

      const faces: FaceData[] = [];
      for (let i = 0; i < pos.count; i += 3) {
        uvs[i * 2] = 0.5; uvs[i * 2 + 1] = 0.95;
        uvs[(i + 1) * 2] = 0.05; uvs[(i + 1) * 2 + 1] = 0.08;
        uvs[(i + 2) * 2] = 0.95; uvs[(i + 2) * 2 + 1] = 0.08;

        const faceIdx = Math.floor(i / 3);
        geo.addGroup(i, 3, faceIdx);

        const v1 = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        const v2 = new THREE.Vector3(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1));
        const v3 = new THREE.Vector3(pos.getX(i + 2), pos.getY(i + 2), pos.getZ(i + 2));
        const centroid = new THREE.Vector3().add(v1).add(v2).add(v3).divideScalar(3);
        const norm = centroid.clone().normalize();

        const val = faceIdx + 1;
        faces.push({
          faceIndex: faceIdx,
          value: val,
          label: `${val}`,
          localNormal: norm,
          centroid
        });
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      const cannonShape = createCannonConvexPolyhedron(geo);
      return { geometry: geo, cannonShape, faces, radius };
    }

    case 8: {
      // D8 Octahedron
      const radius = 1.35;
      const geo = new THREE.OctahedronGeometry(radius);
      geo.computeVertexNormals();

      const pos = geo.attributes.position;
      const uvs = new Float32Array(pos.count * 2);
      geo.clearGroups();

      const faces: FaceData[] = [];
      for (let i = 0; i < pos.count; i += 3) {
        uvs[i * 2] = 0.5; uvs[i * 2 + 1] = 0.95;
        uvs[(i + 1) * 2] = 0.05; uvs[(i + 1) * 2 + 1] = 0.08;
        uvs[(i + 2) * 2] = 0.95; uvs[(i + 2) * 2 + 1] = 0.08;

        const faceIdx = Math.floor(i / 3);
        geo.addGroup(i, 3, faceIdx);

        const v1 = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        const v2 = new THREE.Vector3(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1));
        const v3 = new THREE.Vector3(pos.getX(i + 2), pos.getY(i + 2), pos.getZ(i + 2));
        const centroid = new THREE.Vector3().add(v1).add(v2).add(v3).divideScalar(3);
        const norm = centroid.clone().normalize();

        faces.push({
          faceIndex: faceIdx,
          value: faceIdx + 1,
          label: `${faceIdx + 1}`,
          localNormal: norm,
          centroid
        });
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      const cannonShape = createCannonConvexPolyhedron(geo);
      return { geometry: geo, cannonShape, faces, radius };
    }

    case 10:
    case 100: {
      // D10 / D100 Pentagonal Trapezohedron
      const geo = new THREE.BufferGeometry();
      const positions: number[] = [];
      const uvs: number[] = [];
      const R = 1.35;
      const H = 1.25;
      const n = 5;

      const topApex = [0, H, 0];
      const botApex = [0, -H, 0];
      const upperVerts: Array<[number, number, number]> = [];
      const lowerVerts: Array<[number, number, number]> = [];

      for (let i = 0; i < n; i++) {
        const a1 = (i * 2 * Math.PI) / n;
        upperVerts.push([R * Math.cos(a1), H * 0.2, R * Math.sin(a1)]);
        const a2 = ((i + 0.5) * 2 * Math.PI) / n;
        lowerVerts.push([R * Math.cos(a2), -H * 0.2, R * Math.sin(a2)]);
      }

      geo.clearGroups();
      const faces: FaceData[] = [];

      // 5 Upper kite faces (Indices 0..4)
      for (let i = 0; i < n; i++) {
        const u1 = upperVerts[i];
        const u2 = upperVerts[(i + 1) % n];
        const l1 = lowerVerts[i];

        positions.push(...topApex, ...u2, ...l1);
        uvs.push(0.5, 0.95, 0.9, 0.5, 0.5, 0.08);
        positions.push(...topApex, ...l1, ...u1);
        uvs.push(0.5, 0.95, 0.5, 0.08, 0.1, 0.5);

        geo.addGroup(i * 6, 6, i);

        const vTop = new THREE.Vector3(...topApex);
        const vU1 = new THREE.Vector3(...u1);
        const vU2 = new THREE.Vector3(...u2);
        const vL1 = new THREE.Vector3(...l1);
        const centroid = new THREE.Vector3().add(vTop).add(vU1).add(vU2).add(vL1).divideScalar(4);
        const norm = centroid.clone().normalize();

        const val = sides === 100 ? i * 10 : (i === 0 ? 0 : i);
        const lbl = sides === 100 ? String(i * 10).padStart(2, '0') : (i === 0 ? '0' : String(val));

        faces.push({
          faceIndex: i,
          value: val,
          label: lbl,
          localNormal: norm,
          centroid
        });
      }

      // 5 Lower kite faces (Indices 5..9)
      for (let i = 0; i < n; i++) {
        const l1 = lowerVerts[i];
        const l2 = lowerVerts[(i + 1) % n];
        const u2 = upperVerts[(i + 1) % n];
        const faceIdx = n + i;

        positions.push(...botApex, ...l1, ...u2);
        uvs.push(0.5, 0.05, 0.1, 0.5, 0.5, 0.92);
        positions.push(...botApex, ...u2, ...l2);
        uvs.push(0.5, 0.05, 0.5, 0.92, 0.9, 0.5);

        geo.addGroup(faceIdx * 6, 6, faceIdx);

        const vBot = new THREE.Vector3(...botApex);
        const vL1 = new THREE.Vector3(...l1);
        const vL2 = new THREE.Vector3(...l2);
        const vU2 = new THREE.Vector3(...u2);
        const centroid = new THREE.Vector3().add(vBot).add(vL1).add(vL2).add(vU2).divideScalar(4);
        const norm = centroid.clone().normalize();

        const val = sides === 100 ? faceIdx * 10 : faceIdx;
        const lbl = sides === 100 ? String(val).padStart(2, '0') : String(val);

        faces.push({
          faceIndex: faceIdx,
          value: val,
          label: lbl,
          localNormal: norm,
          centroid
        });
      }

      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geo.computeVertexNormals();

      const cannonShape = createCannonConvexPolyhedron(geo);
      return { geometry: geo, cannonShape, faces, radius: 1.35 };
    }

    case 12: {
      // D12 Dodecahedron
      const radius = 1.3;
      const geo = new THREE.DodecahedronGeometry(radius);
      geo.computeVertexNormals();

      const pos = geo.attributes.position;
      const uvs = new Float32Array(pos.count * 2);
      geo.clearGroups();

      const faces: FaceData[] = [];
      for (let p = 0; p < pos.count; p += 9) {
        const faceIdx = Math.floor(p / 9);

        uvs[p * 2] = 0.5; uvs[p * 2 + 1] = 0.95;
        uvs[(p + 1) * 2] = 0.1; uvs[(p + 1) * 2 + 1] = 0.4;
        uvs[(p + 2) * 2] = 0.9; uvs[(p + 2) * 2 + 1] = 0.4;

        uvs[(p + 3) * 2] = 0.1; uvs[(p + 3) * 2 + 1] = 0.4;
        uvs[(p + 4) * 2] = 0.25; uvs[(p + 4) * 2 + 1] = 0.05;
        uvs[(p + 5) * 2] = 0.9; uvs[(p + 5) * 2 + 1] = 0.4;

        uvs[(p + 6) * 2] = 0.9; uvs[(p + 6) * 2 + 1] = 0.4;
        uvs[(p + 7) * 2] = 0.25; uvs[(p + 7) * 2 + 1] = 0.05;
        uvs[(p + 8) * 2] = 0.75; uvs[(p + 8) * 2 + 1] = 0.05;

        geo.addGroup(p, 9, faceIdx);

        const centroid = new THREE.Vector3();
        for (let k = 0; k < 9; k++) {
          centroid.add(new THREE.Vector3(pos.getX(p + k), pos.getY(p + k), pos.getZ(p + k)));
        }
        centroid.divideScalar(9);
        const norm = centroid.clone().normalize();

        faces.push({
          faceIndex: faceIdx,
          value: faceIdx + 1,
          label: `${faceIdx + 1}`,
          localNormal: norm,
          centroid
        });
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      const cannonShape = createCannonConvexPolyhedron(geo);
      return { geometry: geo, cannonShape, faces, radius };
    }

    case 20: {
      // D20 Icosahedron
      const radius = 1.35;
      const geo = new THREE.IcosahedronGeometry(radius);
      geo.computeVertexNormals();

      const pos = geo.attributes.position;
      const uvs = new Float32Array(pos.count * 2);
      geo.clearGroups();

      const faces: FaceData[] = [];
      for (let i = 0; i < pos.count; i += 3) {
        uvs[i * 2] = 0.5; uvs[i * 2 + 1] = 0.95;
        uvs[(i + 1) * 2] = 0.05; uvs[(i + 1) * 2 + 1] = 0.08;
        uvs[(i + 2) * 2] = 0.95; uvs[(i + 2) * 2 + 1] = 0.08;

        const faceIdx = Math.floor(i / 3);
        geo.addGroup(i, 3, faceIdx);

        const v1 = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i));
        const v2 = new THREE.Vector3(pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1));
        const v3 = new THREE.Vector3(pos.getX(i + 2), pos.getY(i + 2), pos.getZ(i + 2));
        const centroid = new THREE.Vector3().add(v1).add(v2).add(v3).divideScalar(3);
        const norm = centroid.clone().normalize();

        faces.push({
          faceIndex: faceIdx,
          value: faceIdx + 1,
          label: `${faceIdx + 1}`,
          localNormal: norm,
          centroid
        });
      }
      geo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

      const cannonShape = createCannonConvexPolyhedron(geo);
      return { geometry: geo, cannonShape, faces, radius };
    }

    case 6:
    default: {
      // D6 Cube with chamfered look
      const size = 1.3;
      const half = size / 2;
      const geo = new THREE.BoxGeometry(size, size, size);

      const cannonShape = new CANNON.Box(new CANNON.Vec3(half, half, half));

      const normals = [
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(-1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, -1, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(0, 0, -1)
      ];

      const faces: FaceData[] = normals.map((norm, idx) => ({
        faceIndex: idx,
        value: idx + 1,
        label: `${idx + 1}`,
        localNormal: norm,
        centroid: norm.clone().multiplyScalar(half)
      }));

      return { geometry: geo, cannonShape, faces, radius: half * Math.SQRT2 };
    }
  }
}

// Strictly mathematical upward face normal detection (comparing world-space normal with UP vector)
export function detectUpwardFace(
  quaternion: THREE.Quaternion | CANNON.Quaternion,
  faces: FaceData[]
): { value: number; label: string; faceIndex: number; dot: number } {
  let threeQuat: THREE.Quaternion;
  if (quaternion instanceof THREE.Quaternion) {
    threeQuat = quaternion;
  } else {
    threeQuat = new THREE.Quaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w);
  }

  const worldUp = new THREE.Vector3(0, 1, 0);
  let bestDot = -Infinity;
  let bestFace = faces[0];

  const rotatedNormal = new THREE.Vector3();

  for (const face of faces) {
    rotatedNormal.copy(face.localNormal).applyQuaternion(threeQuat);
    const d = rotatedNormal.dot(worldUp);
    if (d > bestDot) {
      bestDot = d;
      bestFace = face;
    }
  }

  return {
    value: bestFace ? bestFace.value : 1,
    label: bestFace ? bestFace.label : '1',
    faceIndex: bestFace ? bestFace.faceIndex : 0,
    dot: bestDot
  };
}
