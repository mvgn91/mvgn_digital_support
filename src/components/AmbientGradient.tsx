import { motion, useMotionValue, useMotionTemplate, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface AmbientGradientProps {
  className?: string;
}

// Cerulean palette — slightly more presence for visible movement
const COLORS = [
  'rgba(75, 163, 242, 0.10)',
  'rgba(61, 139, 255, 0.07)',
  'rgba(93, 169, 255, 0.05)',
  'rgba(75, 163, 242, 0.04)',
];

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
    ];

    return () => controls.forEach(c => c.stop());
  }, []);

  // Derived values for layer 4 (offset from layer 1)
  const x1Scaled = useTransform(x1, v => v * 0.8 + 10);
  const y1Scaled = useTransform(y1, v => v * 0.8);

  return { x1, y1, x2, y2, x3, y3, pulse, breathe, x1Scaled, y1Scaled };
}

export default function AmbientGradient({ className = '' }: AmbientGradientProps) {
  const { x1, y1, x2, y2, x3, y3, pulse, breathe, x1Scaled, y1Scaled } = useGradientAnimation();

  const grad1 = useMotionTemplate`
    radial-gradient(
      ellipse 65% 55% at ${x1}% ${y1}%,
      ${COLORS[0]} 0%,
      transparent 65%
    )
  `;

  const grad2 = useMotionTemplate`
    radial-gradient(
      ellipse 55% 45% at ${x2}% ${y2}%,
      ${COLORS[1]} 0%,
      transparent 60%
    )
  `;

  const grad3 = useMotionTemplate`
    radial-gradient(
      ellipse 45% 55% at ${x3}% ${y3}%,
      ${COLORS[2]} 0%,
      transparent 55%
    )
  `;

  const grad4 = useMotionTemplate`
    radial-gradient(
      ellipse 60% 40% at ${x1Scaled}% ${y1Scaled}%,
      ${COLORS[3]} 0%,
      transparent 70%
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
    </div>
  );
}
