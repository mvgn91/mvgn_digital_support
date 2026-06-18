import { motion, type Variants } from "framer-motion";

interface PhoneScreen {
  src: string;
  alt: string;
}

interface CascadingPhonesProps {
  screens?: PhoneScreen[];
}

const defaultScreens: PhoneScreen[] = [
  { src: "/material%20design%20mockup%201.png", alt: "Mockup 1" },
  { src: "/material%20design%20mockup%202.png", alt: "Mockup 2" },
  { src: "/material%20design%20mockup%203.png", alt: "Mockup 3" },
];

/* ── Base transforms per cascade layer (0 = front, 2 = back) ── */
const layerTransforms = [
  { rotate: 0,    x: 0,   y: 0,   scale: 1,    z: 40,  brightness: 1.0,  saturate: 1.0 },
  { rotate: 6,    x: 20,  y: -6,  scale: 0.91, z: 0,   brightness: 0.75, saturate: 0.65 },
  { rotate: -10,  x: -12, y: 10,  scale: 0.82, z: -40, brightness: 0.5,  saturate: 0.4 },
];

/* ── Hover transforms — more dramatic separation ── */
const hoverTransforms = [
  { rotate: 0,   x: 0,   y: 0,   scale: 1.04, z: 60,  brightness: 1.05, saturate: 1.1 },
  { rotate: 10,  x: 30,  y: -12, scale: 0.87, z: -10, brightness: 0.65, saturate: 0.55 },
  { rotate: -14, x: -24, y: 18,  scale: 0.78, z: -60, brightness: 0.4,  saturate: 0.3 },
];

const imgStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  display: "block",
  objectFit: "contain",
  borderRadius: 32,
  filter:
    "drop-shadow(0 20px 40px rgba(0,0,0,0.45)) drop-shadow(0 0 0 1px rgba(255,255,255,0.02))",
  WebkitUserDrag: "none",
  userSelect: "none" as const,
};

/* ── Build variants per screen index ── */
function buildVariants(i: number): Variants {
  const base = layerTransforms[i];
  const hover = hoverTransforms[i];
  const delay = 0.1 + i * 0.18;

  return {
    hidden: {
      opacity: 0,
      y: 80,
      scale: base.scale * 0.85,
      rotate: base.rotate * 0.5,
    },
    visible: {
      opacity: 1,
      y: base.y,
      scale: base.scale,
      rotate: base.rotate,
      x: base.x,
      filter: `brightness(${base.brightness}) saturate(${base.saturate})`,
      transition: {
        type: "spring" as const,
        damping: 16,
        stiffness: 90,
        mass: 0.8,
        delay,
      },
    },
    hover: {
      scale: hover.scale,
      rotate: hover.rotate,
      x: hover.x,
      y: hover.y,
      z: hover.z,
      filter: `brightness(${hover.brightness}) saturate(${hover.saturate})`,
      transition: {
        type: "spring" as const,
        damping: 14,
        stiffness: 150,
        mass: 0.6,
      },
    },
  };
}

/* Glow variants — child listens to parent's variant propagation */
const glowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0 },
  hover: { opacity: 1 },
};

export default function CascadingPhones({
  screens = defaultScreens,
}: CascadingPhonesProps) {
  return (
    <div
      style={{
        position: "relative",
        perspective: 1200,
        overflow: "visible",
      }}
    >
      {screens.map((screen, i) => {
        const isFront = i === 0;

        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: screens.length - i,
            }}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={buildVariants(i)}
          >
            {isFront && (
              <motion.div
                variants={glowVariants}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: 34,
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.12) 0%, transparent 60%)",
                  pointerEvents: "none",
                  zIndex: -1,
                }}
              />
            )}

            <img
              src={screen.src}
              alt={screen.alt}
              style={imgStyle}
              draggable={false}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
