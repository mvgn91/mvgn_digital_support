import { motion, useMotionValue, useMotionTemplate, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface AmbientGradientProps {
  className?: string;
  palette?: 'cerulean' | 'purple';
}

const PALETTES = {
  cerulean: {
    layers: [
      'rgba(75, 163, 242, 0.10)',
      'rgba(61, 139, 255, 0.07)',
      'rgba(93, 169, 255, 0.05)',
      'rgba(75, 163, 242, 0.04)',
    ],
    tentacles: [
      'rgba(75, 163, 242, 0.12)',
      'rgba(93, 169, 255, 0.09)',
    ],
  },
  purple: {
    layers: [
      'rgba(167, 139, 250, 0.12)',
      'rgba(139, 92, 246, 0.09)',
      'rgba(192, 132, 252, 0.07)',
      'rgba(167, 139, 250, 0.05)',
    ],
    tentacles: [
      'rgba(167, 139, 250, 0.14)',
      'rgba(192, 132, 252, 0.10)',
    ],
  },
};

function useGradientAnimation() {
  // Layer 1 — slow drift (core ambient)
  const x1 = useMotionValue(50);
  const y1 = useMotionValue(50);

  // Layer 2 — counter-drift (secondary)
  const x2 = useMotionValue(50);
  const y2 = useMotionValue(50);

  // Layer 3 — faster pulse (tertiary accent)
  const x3 = useMotionValue(50);
  const y3 = useMotionValue(50);
  const pulse = useMotionValue(1);

  // Layer 4 — subtle base breathing
  const breathe = useMotionValue(1);

  // Tentacle 1 — slow horizontal sway
  const tx1 = useMotionValue(50);
  const ty1 = useMotionValue(0);

  // Tentacle 2 — counter-sway
  const tx2 = useMotionValue(50);
  const ty2 = useMotionValue(0);

  useEffect(() => {
    const controls = [
      // Layer 1: Slow, wide orbit
      animate(x1, [50, 35, 60, 40, 55, 50], {
        duration: 14,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(y1, [50, 55, 35, 60, 45, 50], {
        duration: 16,
        repeat: Infinity,
        ease: 'easeInOut',
      }),

      // Layer 2: Counter-phase drift
      animate(x2, [50, 65, 40, 60, 45, 50], {
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(y2, [50, 40, 65, 45, 55, 50], {
        duration: 15,
        repeat: Infinity,
        ease: 'easeInOut',
      }),

      // Layer 3: Faster, smaller range
      animate(x3, [50, 44, 56, 46, 54, 50], {
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(y3, [50, 56, 44, 54, 46, 50], {
        duration: 11,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(pulse, [1, 1.15, 0.9, 1.1, 1], {
        duration: 12,
        repeat: Infinity,
        ease: 'easeInOut',
      }),

      // Layer 4: Slow breathing
      animate(breathe, [1, 1.05, 0.97, 1.03, 1], {
        duration: 22,
        repeat: Infinity,
        ease: 'easeInOut',
      }),

      // Tentacle 1: Slow horizontal sway
      animate(tx1, [50, 25, 60, 30, 55, 50], {
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(ty1, [0, 15, -5, 10, 0], {
        duration: 16,
        repeat: Infinity,
        ease: 'easeInOut',
      }),

      // Tentacle 2: Counter-sway
      animate(tx2, [50, 70, 35, 65, 45, 50], {
        duration: 22,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
      animate(ty2, [0, -10, 8, -5, 0], {
        duration: 18,
        repeat: Infinity,
        ease: 'easeInOut',
      }),
    ];

    return () => controls.forEach(c => c.stop());
  }, []);

  // Derived values for layer 4 (offset from layer 1)
  const x1Scaled = useTransform(x1, v => v * 0.8 + 10);
  const y1Scaled = useTransform(y1, v => v * 0.8);

  return { x1, y1, x2, y2, x3, y3, pulse, breathe, x1Scaled, y1Scaled, tx1, ty1, tx2, ty2 };
}

export default function AmbientGradient({ className = '', palette = 'cerulean' }: AmbientGradientProps) {
  const colors = PALETTES[palette];
  const { x1, y1, x2, y2, x3, y3, pulse, breathe, x1Scaled, y1Scaled, tx1, ty1, tx2, ty2 } = useGradientAnimation();

  const grad1 = useMotionTemplate`
    radial-gradient(
      ellipse 65% 55% at ${x1}% ${y1}%,
      ${colors.layers[0]} 0%,
      transparent 65%
    )
  `;

  const grad2 = useMotionTemplate`
    radial-gradient(
      ellipse 55% 45% at ${x2}% ${y2}%,
      ${colors.layers[1]} 0%,
      transparent 60%
    )
  `;

  const grad3 = useMotionTemplate`
    radial-gradient(
      ellipse 45% 55% at ${x3}% ${y3}%,
      ${colors.layers[2]} 0%,
      transparent 55%
    )
  `;

  const grad4 = useMotionTemplate`
    radial-gradient(
      ellipse 60% 40% at ${x1Scaled}% ${y1Scaled}%,
      ${colors.layers[3]} 0%,
      transparent 70%
    )
  `;

  const tentacle1 = useMotionTemplate`
    radial-gradient(
      ellipse 30% 120% at ${tx1}% ${ty1}%,
      ${colors.tentacles[0]} 0%,
      transparent 80%
    )
  `;

  const tentacle2 = useMotionTemplate`
    radial-gradient(
      ellipse 25% 110% at ${tx2}% ${ty2}%,
      ${colors.tentacles[1]} 0%,
      transparent 80%
    )
  `;

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {/* Layer 1 — Core ambient glow (slow, wide drift) */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: grad1,
          filter: 'blur(90px)',
        }}
      />

      {/* Layer 2 — Secondary counter-drift */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: grad2,
          filter: 'blur(110px)',
          scale: breathe,
        }}
      />

      {/* Layer 3 — Faster accent orb */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: grad3,
          filter: 'blur(80px)',
          scale: pulse,
        }}
      />

      {/* Layer 4 — Subtle base fill */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: grad4,
          filter: 'blur(60px)',
          opacity: 0.8,
          scale: breathe,
        }}
      />

      {/* Tentacle 1 — Ethereal tendril from hero, slow sway */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: tentacle1,
          filter: 'blur(100px)',
          opacity: 0.85,
        }}
      />

      {/* Tentacle 2 — Counter-sway tendril */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: tentacle2,
          filter: 'blur(90px)',
          opacity: 0.65,
        }}
      />
    </div>
  );
}
