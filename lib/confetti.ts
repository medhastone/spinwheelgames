/**
 * Safe, client-only wrapper for canvas-confetti.
 * Prevents SSR evaluation, avoids Node.js require issues,
 * and eliminates Next.js webpack vendor-chunk errors.
 */

export interface ConfettiOptions {
  particleCount?: number;
  angle?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  gravity?: number;
  drift?: number;
  ticks?: number;
  origin?: { x?: number; y?: number };
  colors?: string[];
  shapes?: ('square' | 'circle' | 'star')[];
  scalar?: number;
  zIndex?: number;
  disableForReducedMotion?: boolean;
}

export default function confetti(options?: ConfettiOptions): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  return import('canvas-confetti')
    .then((mod) => {
      const run = (mod.default || mod) as (opts?: ConfettiOptions) => void;
      if (typeof run === 'function') {
        run(options);
      }
    })
    .catch((err) => {
      console.warn('Could not launch confetti:', err);
    });
}

export { confetti };
