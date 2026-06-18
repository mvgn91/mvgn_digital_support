import { motion } from 'framer-motion';

export default function RotatingPhone() {
  return (
    <div style={sceneStyle}>
      <motion.div
        style={phoneBodyStyle}
        animate={{
          rotateY: [-360, 0],
          rotateX: [0, 4, -4, 0],
          y: [-10, 10, -10],
        }}
        transition={{
          duration: 12,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        {/* Notch */}
        <div style={notchStyle} />
        {/* Camera lens */}
        <div style={cameraLensStyle} />

        {/* Screen with streaming UI */}
        <div style={screenStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <span style={dotStyle} />
            <span style={labelStyle}>Centro de Soporte</span>
          </div>

          {/* Hero card */}
          <div style={heroCardStyle}>
            <span style={heroBadgeStyle}>Destacado</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ ...barStyle, width: '100%' }} />
              <div style={{ ...barStyle, width: '55%' }} />
            </div>
          </div>

          {/* Row 1 */}
          <div style={rowStyle}>
            <span style={rowLabelStyle}>Continuar viendo</span>
            <div style={thumbsRowStyle}>
              <div style={thumbStyle} />
              <div style={{ ...thumbStyle, ...thumbRedStyle }} />
              <div style={thumbStyle} />
            </div>
          </div>

          {/* Row 2 */}
          <div style={rowStyle}>
            <span style={rowLabelStyle}>Recomendados</span>
            <div style={thumbsRowStyle}>
              <div style={{ ...thumbStyle, ...thumbRedStyle }} />
              <div style={thumbStyle} />
              <div style={{ ...thumbStyle, ...thumbRedStyle }} />
            </div>
          </div>

          {/* Bottom nav */}
          <div style={bottomNavStyle}>
            <div style={navDotActiveStyle} />
            <div style={navDotStyle} />
            <div style={navDotStyle} />
          </div>

          {/* Home indicator */}
          <div style={homeStyle} />
        </div>

        {/* Back detail */}
        <div style={backStyle}>
          <span style={backLogoSpan}>MVGN</span>
          <span style={backSubSpan}>Labs</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Styles ── */

const sceneStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  minHeight: '400px',
  perspective: '1400px',
  overflow: 'hidden',
};

const phoneBodyStyle: React.CSSProperties = {
  width: '260px',
  height: '540px',
  background: 'linear-gradient(180deg, #2a2a2e 0%, #1c1c1e 50%, #2a2a2e 100%)',
  borderRadius: '44px',
  padding: '10px',
  boxShadow: `
    0 30px 60px -12px rgba(0,0,0,0.7),
    inset 0px 0px 12px rgba(141,141,134,0.08),
    inset 0px 7px 0px 4px rgba(230,230,225,0.04),
    inset 0px -6px 0px 4px rgba(230,230,225,0.03)
  `,
  transformStyle: 'preserve-3d',
  position: 'relative',
  border: '1px solid rgba(180,185,200,0.06)',
  flexShrink: 0,
};

/* ── Hardware details ── */
const notchStyle: React.CSSProperties = {
  position: 'absolute',
  top: '12px',
  left: '50%',
  transform: 'translateX(-50%) translateZ(16px)',
  width: '34%',
  height: '6px',
  background: 'linear-gradient(180deg, rgba(60,60,65,0.5), transparent)',
  borderRadius: '0 0 8px 8px',
  zIndex: 5,
  pointerEvents: 'none',
};

const cameraLensStyle: React.CSSProperties = {
  position: 'absolute',
  top: '16px',
  right: '27%',
  transform: 'translateZ(16px)',
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  background: 'rgba(30,30,35,0.9)',
  border: '1px solid rgba(80,80,90,0.15)',
  zIndex: 5,
  pointerEvents: 'none',
};

/* ── Screen ── */
const screenStyle: React.CSSProperties = {
  height: '100%',
  borderRadius: '34px',
  background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
  border: '1px solid rgba(255,255,255,0.015)',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  padding: '12px 10px 10px',
  transform: 'translateZ(10px)',
  boxSizing: 'border-box',
  fontFamily: 'system-ui, -apple-system, sans-serif',
};

/* ── Streaming UI ── */
const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  paddingBottom: '8px',
  borderBottom: '1px solid rgba(255,255,255,0.03)',
  marginBottom: '10px',
};

const dotStyle: React.CSSProperties = {
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  background: 'rgba(220,38,38,0.55)',
  flexShrink: 0,
};

const labelStyle: React.CSSProperties = {
  fontSize: '6px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const heroCardStyle: React.CSSProperties = {
  borderRadius: '8px',
  padding: '8px 10px',
  background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.02))',
  border: '1px solid rgba(220,38,38,0.06)',
  marginBottom: '14px',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const heroBadgeStyle: React.CSSProperties = {
  fontSize: '5.5px',
  fontWeight: 700,
  color: 'rgba(220,38,38,0.5)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
};

const barStyle: React.CSSProperties = {
  height: '6px',
  borderRadius: '3px',
  background: 'rgba(255,255,255,0.04)',
};

const rowStyle: React.CSSProperties = {
  padding: '6px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
};

const rowLabelStyle: React.CSSProperties = {
  fontSize: '5.5px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.2)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const thumbsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '6px',
};

const thumbStyle: React.CSSProperties = {
  flex: 1,
  aspectRatio: '16 / 10',
  borderRadius: '5px',
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.02)',
};

const thumbRedStyle: React.CSSProperties = {
  background: 'rgba(220,38,38,0.06)',
  borderColor: 'rgba(220,38,38,0.08)',
};

const bottomNavStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  padding: '8px 0 4px',
  marginTop: 'auto',
};

const navDotStyle: React.CSSProperties = {
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
};

const navDotActiveStyle: React.CSSProperties = {
  width: '14px',
  height: '4px',
  borderRadius: '3px',
  background: 'rgba(220,38,38,0.5)',
};

const homeStyle: React.CSSProperties = {
  width: '70px',
  height: '3px',
  background: 'rgba(255,255,255,0.06)',
  borderRadius: '3px',
  margin: '4px auto 0',
  flexShrink: 0,
};

/* ── Back detail ── */
const backStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  transform: 'rotateY(180deg) translateZ(10px)',
  backfaceVisibility: 'hidden',
  pointerEvents: 'none',
};

const backLogoSpan: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 800,
  color: 'rgba(255,255,255,0.06)',
  letterSpacing: '0.25em',
};

const backSubSpan: React.CSSProperties = {
  fontSize: '6px',
  fontWeight: 400,
  color: 'rgba(255,255,255,0.03)',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
};
