export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorData {
  hex: string;
  rgb: string;
  hsl: string;
  name?: string;
  r: number;
  g: number;
  b: number;
  h: number;
  s: number;
  l: number;
}

export interface ColorHarmony {
  type: string;
  label: string;
  description: string;
  colors: ColorData[];
}

// Convert HEX to RGB
export function hexToRgb(hex: string): RgbColor {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    clean = clean.split('').map((c) => c + c).join('');
  }
  const num = parseInt(clean, 16);
  if (isNaN(num)) return { r: 0, g: 0, b: 0 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255
  };
}

// Convert RGB to HEX
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  const toHex = (v: number) => clamp(v).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// Convert RGB to HSL
export function rgbToHsl(r: number, g: number, b: number): HslColor {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Convert HSL to RGB
export function hslToRgb(h: number, s: number, l: number): RgbColor {
  const hNorm = ((h % 360) + 360) % 360 / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return { r, g, b };
}

// Create complete ColorData from HEX
export function createColorData(hex: string, name?: string): ColorData {
  const { r, g, b } = hexToRgb(hex);
  const { h, s, l } = rgbToHsl(r, g, b);
  const normHex = rgbToHex(r, g, b);
  return {
    hex: normHex,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
    name: name || getColorName(normHex),
    r,
    g,
    b,
    h,
    s,
    l
  };
}

// Create ColorData from HSL
export function createColorFromHsl(h: number, s: number, l: number, name?: string): ColorData {
  const { r, g, b } = hslToRgb(h, s, l);
  const hex = rgbToHex(r, g, b);
  return {
    hex,
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`,
    name: name || getColorName(hex),
    r,
    g,
    b,
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l)
  };
}

// Calculate perceived luminance (WCAG formula)
export function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Return true if text should be white, false if black
export function shouldUseWhiteText(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex);
  const lum = getLuminance(r, g, b);
  return lum < 0.45;
}

// Generate Color Harmonies for a base color
export function generateHarmonies(baseColor: ColorData): ColorHarmony[] {
  const { h, s, l } = baseColor;

  // 1. Complementary (180 deg)
  const compColor = createColorFromHsl((h + 180) % 360, s, l, 'Complementary');

  // 2. Analogous (±30 deg)
  const analog1 = createColorFromHsl((h - 30 + 360) % 360, s, l, 'Analogous -30°');
  const analog2 = createColorFromHsl((h + 30) % 360, s, l, 'Analogous +30°');

  // 3. Triadic (120 deg, 240 deg)
  const triad1 = createColorFromHsl((h + 120) % 360, s, l, 'Triadic 1');
  const triad2 = createColorFromHsl((h + 240) % 360, s, l, 'Triadic 2');

  // 4. Split-Complementary (150 deg, 210 deg)
  const split1 = createColorFromHsl((h + 150) % 360, s, l, 'Split Comp 1');
  const split2 = createColorFromHsl((h + 210) % 360, s, l, 'Split Comp 2');

  // 5. Tetradic / Square (90, 180, 270 deg)
  const tetra1 = createColorFromHsl((h + 90) % 360, s, l, 'Tetradic 1');
  const tetra2 = compColor;
  const tetra3 = createColorFromHsl((h + 270) % 360, s, l, 'Tetradic 3');

  // 6. Monochromatic shades
  const monoLight = createColorFromHsl(h, Math.max(10, s - 10), Math.min(92, l + 25), 'Tint / Light');
  const monoSoft = createColorFromHsl(h, s, Math.min(80, l + 12), 'Soft Shade');
  const monoDark = createColorFromHsl(h, Math.min(100, s + 5), Math.max(15, l - 20), 'Deep Shade');
  const monoDeep = createColorFromHsl(h, Math.min(100, s + 10), Math.max(8, l - 35), 'Shadow');

  return [
    {
      type: 'complementary',
      label: 'Complementary',
      description: 'Opposite on the color wheel. Maximum contrast and vibrant visual tension.',
      colors: [baseColor, compColor]
    },
    {
      type: 'triadic',
      label: 'Triadic',
      description: 'Three evenly spaced colors (120° apart). Vibrant and balanced palettes.',
      colors: [baseColor, triad1, triad2]
    },
    {
      type: 'analogous',
      label: 'Analogous',
      description: 'Adjacent colors on the wheel (±30°). Harmonious, calming, and natural.',
      colors: [analog1, baseColor, analog2]
    },
    {
      type: 'split-complementary',
      label: 'Split-Complementary',
      description: 'High contrast with less harshness than pure complementary.',
      colors: [baseColor, split1, split2]
    },
    {
      type: 'tetradic',
      label: 'Tetradic / Square',
      description: 'Four colors forming a balanced rectangle or square on the wheel.',
      colors: [baseColor, tetra1, tetra2, tetra3]
    },
    {
      type: 'monochromatic',
      label: 'Monochromatic',
      description: 'Different lightness and saturation values of the same hue family.',
      colors: [monoLight, monoSoft, baseColor, monoDark, monoDeep]
    }
  ];
}

// Generate completely random pleasing color
export function generateRandomHex(): string {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Approximate color names dictionary
const COLOR_NAMES: [string, string][] = [
  ['#E63946', 'Crimson Red'],
  ['#FF0000', 'Pure Red'],
  ['#FF4500', 'Orange Red'],
  ['#FF7F50', 'Coral'],
  ['#FF8C00', 'Dark Orange'],
  ['#FFA500', 'Vibrant Orange'],
  ['#FFB703', 'Golden Sunset'],
  ['#FFD700', 'Gold'],
  ['#FFFF00', 'Electric Yellow'],
  ['#ADFF2F', 'Green Yellow'],
  ['#7FFF00', 'Chartreuse'],
  ['#00FF00', 'Lime Green'],
  ['#06D6A0', 'Mint Emerald'],
  ['#2EC4B6', 'Tiffany Teal'],
  ['#00FFFF', 'Cyan / Aqua'],
  ['#4CC9F0', 'Sky Azure'],
  ['#0077B6', 'Ocean Blue'],
  ['#0000FF', 'Pure Blue'],
  ['#1D3557', 'Navy Blue'],
  ['#7209B7', 'Royal Purple'],
  ['#8A2BE2', 'Blue Violet'],
  ['#9D4EDD', 'Amethyst Violet'],
  ['#F72585', 'Neon Magenta'],
  ['#FF1493', 'Deep Pink'],
  ['#FF69B4', 'Hot Pink'],
  ['#F77F00', 'Warm Amber'],
  ['#8B4513', 'Saddle Brown'],
  ['#2B2D42', 'Dark Slate'],
  ['#FFFFFF', 'Pure White'],
  ['#000000', 'Pure Black']
];

export function getColorName(hex: string): string {
  const target = hexToRgb(hex);
  let bestMatch = 'Custom Hue';
  let minDistance = Infinity;

  for (const [presetHex, name] of COLOR_NAMES) {
    const p = hexToRgb(presetHex);
    const dist = Math.sqrt(
      Math.pow(target.r - p.r, 2) +
      Math.pow(target.g - p.g, 2) +
      Math.pow(target.b - p.b, 2)
    );
    if (dist < minDistance) {
      minDistance = dist;
      bestMatch = name;
    }
  }

  return bestMatch;
}

// Preset Color Palettes for the Wheel
export interface ColorWheelPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  colors: string[];
}

export const COLOR_WHEEL_PRESETS: ColorWheelPreset[] = [
  {
    id: 'artist-12',
    name: '12-Hue Classic Artist Wheel',
    category: 'Traditional',
    description: 'Primary (Red, Yellow, Blue), secondary (Orange, Green, Purple), and tertiary hues.',
    colors: [
      '#FF0000',
      '#FF7F00',
      '#FFA500',
      '#FFD700',
      '#FFFF00',
      '#7FFF00',
      '#00FF00',
      '#00FFFF',
      '#0000FF',
      '#8A2BE2',
      '#9400D3',
      '#FF007F'
    ]
  },
  {
    id: 'digital-spectral',
    name: '12-Hue Digital Spectrum',
    category: 'Digital',
    description: 'Evenly distributed 30-degree hue intervals around the sRGB color wheel.',
    colors: [
      '#FF0000',
      '#FF8000',
      '#FFFF00',
      '#80FF00',
      '#00FF00',
      '#00FF80',
      '#00FFFF',
      '#0080FF',
      '#0000FF',
      '#8000FF',
      '#FF00FF',
      '#FF0080'
    ]
  },
  {
    id: 'neon-cyberpunk',
    name: 'Neon Cyberpunk',
    category: 'Aesthetic',
    description: 'High-voltage electric colors inspired by night cityscapes and retro synthwave.',
    colors: [
      '#FF0055',
      '#FF5500',
      '#FFE600',
      '#00FF66',
      '#00FFFF',
      '#0066FF',
      '#9900FF',
      '#FF00AA'
    ]
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    category: 'Soft',
    description: 'Gentle, soothing pastel tones ideal for spring, baby showers, and soft UI designs.',
    colors: [
      '#FFB4A2',
      '#FFCDB2',
      '#E5989B',
      '#B5838D',
      '#6D6875',
      '#A8DADC',
      '#B8F2E6',
      '#FCD5CE'
    ]
  },
  {
    id: 'earthy-boho',
    name: 'Earthy Boho & Nature',
    category: 'Nature',
    description: 'Warm terracotta, sage green, sandy desert ochre, and deep woodland olive.',
    colors: [
      '#264653',
      '#2A9D8F',
      '#E9C46A',
      '#F4A261',
      '#E76F51',
      '#606C38',
      '#283618',
      '#DDA15E'
    ]
  },
  {
    id: 'retro-80s',
    name: 'Retro 80s Pop',
    category: 'Retro',
    description: 'Vibrant pop art colors reminiscent of arcade machines and 80s graphic posters.',
    colors: [
      '#F72585',
      '#7209B7',
      '#3A0CA3',
      '#4361EE',
      '#4CC9F0',
      '#06D6A0',
      '#FFD166',
      '#EF476F'
    ]
  }
];
