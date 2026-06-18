import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, RoundedBox, Html } from '@react-three/drei';

function PhoneModel() {
  return (
    <group>
      {/* ── Phone Body ── */}
      <RoundedBox args={[2.4, 5.0, 0.32]} radius={0.18}>
        <meshStandardMaterial
          color="#1c1c1e"
          metalness={0.55}
          roughness={0.15}
        />
      </RoundedBox>

      {/* ── Aluminum frame edge (slightly larger, no face) ── */}
      <RoundedBox args={[2.44, 5.04, 0.28]} radius={0.2}>
        <meshStandardMaterial
          color="#2a2a2e"
          metalness={0.7}
          roughness={0.25}
          transparent
          opacity={0.15}
        />
      </RoundedBox>

      {/* ── Screen ── */}
      <mesh position={[0, 0, 0.165]}>
        <planeGeometry args={[2.15, 4.5]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* ── Notch bar ── */}
      <mesh position={[0, 2.09, 0.166]}>
        <planeGeometry args={[0.75, 0.28]} />
        <meshStandardMaterial color="#1c1c1e" />
      </mesh>

      {/* ── Camera lens ── */}
      <mesh position={[0.15, 2.14, 0.167]}>
        <circleGeometry args={[0.025, 16]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-0.15, 2.14, 0.167]}>
        <circleGeometry args={[0.02, 16]} />
        <meshStandardMaterial color="#1a1a1c" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* ── Side buttons ── */}
      <mesh position={[1.21, 0.5, 0]}>
        <boxGeometry args={[0.04, 0.35, 0.04]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.3} roughness={0.4} />
      </mesh>
      <mesh position={[1.21, -0.3, 0]}>
        <boxGeometry args={[0.04, 0.55, 0.04]} />
        <meshStandardMaterial color="#2a2a2c" metalness={0.3} roughness={0.4} />
      </mesh>

      {/* ── Back detail ── */}
      <Html position={[0, 0, -0.165]} transform distanceFactor={2.8}>
        <div style={backStyle}>
          <span style={backLogoStyle}>MVGN</span>
          <span style={backSubStyle}>Labs</span>
        </div>
      </Html>

      {/* ── Streaming UI on Screen ── */}
      <Html position={[0, 0, 0.168]} transform distanceFactor={2.8}>
        <div style={screenStyle}>
          <div style={headerStyle}>
            <span style={dotStyle} />
            <span style={labelStyle}>Centro de Soporte</span>
          </div>

          <div style={heroStyle}>
            <span style={heroBadgeStyle}>Destacado</span>
            <div style={heroBarsStyle}>
              <span style={{ ...barStyle, width: '100%' }} />
              <span style={{ ...barStyle, width: '52%' }} />
            </div>
          </div>

          <div style={rowStyle}>
            <span style={rowLabelStyle}>Continuar viendo</span>
            <div style={thumbsRowStyle}>
              <span style={thumbStyle} />
              <span style={{ ...thumbStyle, ...thumbRedStyle }} />
              <span style={thumbStyle} />
            </div>
          </div>

          <div style={rowStyle}>
            <span style={rowLabelStyle}>Recomendados</span>
            <div style={thumbsRowStyle}>
              <span style={{ ...thumbStyle, ...thumbRedStyle }} />
              <span style={thumbStyle} />
              <span style={{ ...thumbStyle, ...thumbRedStyle }} />
            </div>
          </div>

          <div style={bottomNavStyle}>
            <span style={{ ...navDotStyle, ...navDotActiveStyle }} />
            <span style={navDotStyle} />
            <span style={navDotStyle} />
          </div>

          <div style={homeIndicatorStyle} />
        </div>
      </Html>
    </group>
  );
}

export default function Phone3D() {
  return (
    <div style={containerStyle}>
      <Canvas
        camera={{ position: [0, 0.2, 5.5], fov: 22 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 8, 5]} intensity={1.2} />
        <pointLight position={[-4, -3, 4]} intensity={0.3} color="#dc2626" />
        <Environment preset="city" />
        <PhoneModel />
        <OrbitControls
          autoRotate
          autoRotateSpeed={3}
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          minPolarAngle={Math.PI / 2 - 0.15}
          maxPolarAngle={Math.PI / 2 + 0.15}
        />
      </Canvas>
    </div>
  );
}

/* ── Styles ── */

const backStyle: React.CSSProperties = {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  width: '120px',
};

const backLogoStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 800,
  color: 'rgba(255,255,255,0.06)',
  letterSpacing: '0.25em',
};

const backSubStyle: React.CSSProperties = {
  fontSize: '6px',
  fontWeight: 400,
  color: 'rgba(255,255,255,0.03)',
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
};

const containerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  position: 'relative',
};

const screenStyle: React.CSSProperties = {
  width: '215px',
  height: '450px',
  background: 'linear-gradient(180deg, #0c0c0c 0%, #080808 100%)',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 8px 8px',
  overflow: 'hidden',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  boxSizing: 'border-box',
};

const headerStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  paddingBottom: '6px',
  borderBottom: '1px solid rgba(255,255,255,0.03)',
  marginBottom: '8px',
};

const dotStyle: React.CSSProperties = {
  width: '5px',
  height: '5px',
  borderRadius: '50%',
  background: 'rgba(220,38,38,0.55)',
  flexShrink: 0,
};

const labelStyle: React.CSSProperties = {
  fontSize: '5px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.3)',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
};

const heroStyle: React.CSSProperties = {
  borderRadius: '6px',
  padding: '6px 8px',
  background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(220,38,38,0.02))',
  border: '1px solid rgba(220,38,38,0.06)',
  marginBottom: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
};

const heroBadgeStyle: React.CSSProperties = {
  fontSize: '4.5px',
  fontWeight: 700,
  color: 'rgba(220,38,38,0.5)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
};

const heroBarsStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '3px',
};

const barStyle: React.CSSProperties = {
  height: '5px',
  borderRadius: '3px',
  background: 'rgba(255,255,255,0.04)',
};

const rowStyle: React.CSSProperties = {
  padding: '5px 0',
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const rowLabelStyle: React.CSSProperties = {
  fontSize: '4.5px',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.2)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
};

const thumbsRowStyle: React.CSSProperties = {
  display: 'flex',
  gap: '5px',
};

const thumbStyle: React.CSSProperties = {
  flex: 1,
  aspectRatio: '16 / 10',
  borderRadius: '4px',
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
  padding: '6px 0 4px',
  marginTop: 'auto',
};

const navDotStyle: React.CSSProperties = {
  width: '4px',
  height: '4px',
  borderRadius: '50%',
  background: 'rgba(255,255,255,0.08)',
};

const navDotActiveStyle: React.CSSProperties = {
  background: 'rgba(220,38,38,0.5)',
  width: '14px',
  borderRadius: '3px',
};

const homeIndicatorStyle: React.CSSProperties = {
  width: '60px',
  height: '3px',
  background: 'rgba(255,255,255,0.06)',
  borderRadius: '3px',
  margin: '3px auto 0',
  flexShrink: 0,
};
