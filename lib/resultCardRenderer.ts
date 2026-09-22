import { ResultCardData } from './types';

/**
 * Renders a 1200x630 viral result card on an HTML5 canvas.
 * Returns a Blob (PNG) for download or clipboard copy.
 */
export async function renderResultCardToBlob(data: ResultCardData): Promise<Blob | null> {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // 1. Background Gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
  bgGrad.addColorStop(0, '#0c0d14');
  bgGrad.addColorStop(0.5, '#131422');
  bgGrad.addColorStop(1, '#1b1c2e');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 630);

  // Subtle decorative radial glow in center
  const radialGlow = ctx.createRadialGradient(600, 260, 50, 600, 260, 450);
  radialGlow.addColorStop(0, 'rgba(70, 72, 212, 0.28)');
  radialGlow.addColorStop(0.5, 'rgba(99, 102, 241, 0.12)');
  radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = radialGlow;
  ctx.fillRect(0, 0, 1200, 630);

  // Outer border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 20, 1160, 590);

  // 2. Top Header Bar
  // Brand
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 24px system-ui, -apple-system, sans-serif';
  ctx.fillText('SPINWHEELGAMES.ORG', 50, 70);

  // Provably Fair Seal Tag
  ctx.fillStyle = 'rgba(78, 222, 163, 0.15)';
  ctx.strokeStyle = 'rgba(78, 222, 163, 0.4)';
  ctx.lineWidth = 1;
  const tagX = 850;
  const tagY = 46;
  const tagW = 300;
  const tagH = 34;
  ctx.beginPath();
  ctx.roundRect(tagX, tagY, tagW, tagH, 17);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#4edea3';
  ctx.font = 'bold 13px system-ui, -apple-system, monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PROVABLY FAIR • CSPRNG SECURED', tagX + tagW / 2, tagY + 22);

  // 3. Central Trophy / Badge Emblem
  ctx.textAlign = 'center';
  const badgeY = 160;

  // Badge glow ring
  ctx.beginPath();
  ctx.arc(600, badgeY, 48, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Trophy / Crown Icon glyph
  ctx.fillStyle = '#fbbf24';
  ctx.font = '42px system-ui, sans-serif';
  ctx.fillText('🏆', 600, badgeY + 14);

  // Challenge / Mode Label
  ctx.fillStyle = '#9ca3af';
  ctx.font = '600 16px system-ui, -apple-system, sans-serif';
  ctx.fillText((data.challengeName || 'DECISION RESULT').toUpperCase(), 600, 245);

  // 4. Winning Text
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 52px system-ui, -apple-system, sans-serif';
  
  // Truncate or fit if text is very long
  let winText = data.winner;
  if (winText.length > 28) {
    winText = winText.substring(0, 26) + '...';
  }
  ctx.fillText(winText, 600, 315);

  // 5. Stat Cards Row
  const cardY = 380;
  const cardH = 95;
  const gap = 20;

  // Let's draw 3 or 4 stat chips
  const chips: { label: string; value: string; color: string }[] = [
    { label: 'ACTIVE STREAK', value: `🔥 ${data.streak} ${data.streak === 1 ? 'Day' : 'Days'}`, color: '#f59e0b' },
    { label: 'ODDS', value: `${data.oddsPercent}%`, color: '#10b981' },
    { label: 'ENTROPY SEED', value: data.seed.substring(0, 10), color: '#818cf8' }
  ];

  if (data.modifier) {
    chips.push({
      label: 'SURPRISE TWIST',
      value: data.modifier.tag,
      color: data.modifier.accentColor
    });
  }

  const numChips = chips.length;
  const totalW = 1000;
  const chipW = (totalW - gap * (numChips - 1)) / numChips;
  const startX = 100;

  chips.forEach((chip, i) => {
    const x = startX + i * (chipW + gap);

    // Box
    ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(x, cardY, chipW, cardH, 16);
    ctx.fill();
    ctx.stroke();

    // Label
    ctx.textAlign = 'center';
    ctx.fillStyle = '#9ca3af';
    ctx.font = 'bold 11px system-ui, -apple-system, monospace';
    ctx.fillText(chip.label, x + chipW / 2, cardY + 32);

    // Value
    ctx.fillStyle = chip.color;
    ctx.font = 'bold 22px system-ui, -apple-system, sans-serif';
    ctx.fillText(chip.value, x + chipW / 2, cardY + 68);
  });

  // 6. Bottom Footer
  ctx.textAlign = 'center';
  ctx.fillStyle = '#6b7280';
  ctx.font = '14px system-ui, -apple-system, sans-serif';
  ctx.fillText('Provably Fair Client-Side Randomness • Spin & Challenge Friends at spinwheelgames.org', 600, 560);

  return new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png');
  });
}
