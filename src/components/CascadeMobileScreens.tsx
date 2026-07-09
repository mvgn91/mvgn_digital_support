"use client";

import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type SpringOptions,
} from "framer-motion";

export interface CascadeMobileScreensImages {
  streaming: string;
  addon: string;
  blog: string;
}

interface CascadeMobileScreensProps {
  images: CascadeMobileScreensImages;
  className?: string;
}

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

const MOUSE_SPRING: SpringOptions = { damping: 30, stiffness: 200, mass: 0.5 };
const ROTATE_X_LIMIT = 4;
const ROTATE_Y_LIMIT = 8;

function PhoneMockup({
  src,
  alt,
  phoneWidth,
}: {
  src: string;
  alt: string;
  phoneWidth: number;
}) {
  const bezelH = Math.round(phoneWidth * 0.05);
  const bezelV = Math.round(phoneWidth * 0.065);
  const bodyRadius = Math.round(phoneWidth * 0.14);
  const screenW = phoneWidth - bezelH * 2;
  const screenH = Math.round(screenW * 2.1);
  const bodyH = screenH + bezelV * 2;
  const notchW = Math.round(phoneWidth * 0.22);
  const homeW = Math.round(phoneWidth * 0.28);

  return (
    <div
      style={{
        position: "relative",
        width: phoneWidth,
        height: bodyH,
        borderRadius: bodyRadius,
        background:
          "linear-gradient(180deg, #1c1c1e 0%, #26262a 50%, #1c1c1e 100%)",
        boxShadow:
          "0 24px 48px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03), 0 0 20px rgba(220,38,38,0.07)",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: bodyRadius,
          border: "1px solid rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "40%",
          borderRadius: `${bodyRadius}px ${bodyRadius}px 0 0`,
          background:
            "radial-gradient(ellipse 70% 100% at 50% 0%, rgba(220,38,38,0.06) 0%, transparent 80%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: bezelV,
          left: bezelH,
          width: screenW,
          height: screenH,
          borderRadius: Math.round(bodyRadius * 0.55),
          overflow: "hidden",
          background: "#000",
        }}
      >
        <img
          src={src}
          alt={alt}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: bezelV + 5,
          left: "50%",
          transform: "translateX(-50%)",
          width: notchW,
          height: 5,
          borderRadius: 3,
          background: "rgba(0,0,0,0.6)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: bezelV + 5,
          left: "50%",
          transform: "translateX(-50%)",
          width: homeW,
          height: 3,
          borderRadius: 2,
          background: "rgba(255,255,255,0.07)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: bodyRadius,
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 30%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

interface CardDef {
  key: "streaming" | "addon" | "blog";
  src: string;
  alt: string;
  desktop: { x: number; y: number; z: number; rotateY: number; scale: number };
  mobile: { x: number; y: number; z: number; rotateY: number; scale: number };
  floatAmp: number;
  floatDur: number;
  floatDelay: number;
}

const CARDS: CardDef[] = [
  {
    key: "streaming",
    src: "",
    alt: "MVGN Streaming App",
    desktop: { x: 0, y: -12, z: 60, rotateY: 0, scale: 1.06 },
    mobile: { x: 0, y: -55, z: 30, rotateY: 0, scale: 0.80 },
    floatAmp: 10,
    floatDur: 6,
    floatDelay: 0,
  },
  {
    key: "addon",
    src: "",
    alt: "Audio Latino Add-on Installation",
    desktop: { x: -170, y: 35, z: -50, rotateY: 18, scale: 0.88 },
    mobile: { x: 24, y: 15, z: -15, rotateY: -8, scale: 0.65 },
    floatAmp: 9,
    floatDur: 8,
    floatDelay: 1.2,
  },
  {
    key: "blog",
    src: "",
    alt: "MVGN Tech Blog",
    desktop: { x: 170, y: 50, z: -35, rotateY: -18, scale: 0.88 },
    mobile: { x: -24, y: 80, z: -30, rotateY: 8, scale: 0.52 },
    floatAmp: 11,
    floatDur: 7,
    floatDelay: 0.6,
  },
];

const PHONE_WIDTH = { desktop: 200, tablet: 170, mobile: 150 };
const SCENE_HEIGHT = { desktop: 480, tablet: 430, mobile: 420 };

export default function CascadeMobileScreens({
  images,
  className = "",
}: CascadeMobileScreensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
  const isDesktop = !isMobile && !isTablet;

  const cards: CardDef[] = CARDS.map((c, i) => ({
    ...c,
    src: [images.streaming, images.addon, images.blog][i],
  }));

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, MOUSE_SPRING);
  const smoothY = useSpring(mouseY, MOUSE_SPRING);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const cardSpread = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const rotateX = useTransform(
    smoothY,
    [0, 1],
    [ROTATE_X_LIMIT, -ROTATE_X_LIMIT]
  );
  const rotateY = useTransform(
    smoothX,
    [0, 1],
    [-ROTATE_Y_LIMIT, ROTATE_Y_LIMIT]
  );

  const spreadOffsets = [
    useTransform(cardSpread, (v) => v * 0),
    useTransform(cardSpread, (v) => v * -12),
    useTransform(cardSpread, (v) => v * 12),
  ];

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (isMobile) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [isMobile]
  );

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, []);

  const perspective = isMobile ? 800 : isTablet ? 1000 : 1200;
  const sceneHeight = isMobile
    ? SCENE_HEIGHT.mobile
    : isTablet
      ? SCENE_HEIGHT.tablet
      : SCENE_HEIGHT.desktop;
  const phoneWidth = isMobile
    ? PHONE_WIDTH.mobile
    : isTablet
      ? PHONE_WIDTH.tablet
      : PHONE_WIDTH.desktop;

  return (
    <div
      ref={containerRef}
      className={className}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        position: "relative",
        width: "100%",
        overflow: "visible",
        perspective,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          overflow: "visible",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "min(600px, 70vw)",
            height: "min(600px, 70vw)",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, rgba(255,70,70,0.1) 0%, transparent 70%)",
            filter: "blur(100px)",
            borderRadius: "50%",
          }}
        />
      </div>

      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: sceneHeight,
          transformStyle: "preserve-3d",
          rotateX: isDesktop ? rotateX : 0,
          rotateY: isDesktop ? rotateY : 0,
          y: parallaxY,
        }}
      >
        {cards.map((card, i) => {
          const pos = isDesktop ? card.desktop : card.mobile;
          const scrollY = spreadOffsets[i];

          const enterDelay = i * 0.12 + (isDesktop ? 0.1 : 0);

          return (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: -70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: enterDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
              }}
            >
              <motion.div
                style={{
                  x: pos.x,
                  z: pos.z,
                  rotateY: pos.rotateY,
                  scale: pos.scale,
                  y: scrollY,
                }}
              >
                <motion.div
                  style={{ y: pos.y }}
                  animate={{
                    y: [pos.y, pos.y + card.floatAmp, pos.y],
                    x: [0, card.floatAmp * (isDesktop ? 0.15 : 0.35) * (i % 2 === 0 ? 1 : -1), 0],
                  }}
                  transition={{
                    duration: card.floatDur,
                    delay: card.floatDelay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <PhoneMockup
                    src={card.src}
                    alt={card.alt}
                    phoneWidth={phoneWidth}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
