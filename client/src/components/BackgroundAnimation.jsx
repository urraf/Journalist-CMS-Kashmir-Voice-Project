import React from 'react'

// Deterministic particles (no Math.random in render)
const particles = [
  { left: '7%',   size: 2,   dur: 22, delay: 0,  op: 0.25 },
  { left: '14%',  size: 1.5, dur: 28, delay: 3,  op: 0.2  },
  { left: '22%',  size: 2.5, dur: 19, delay: 7,  op: 0.3  },
  { left: '30%',  size: 1.8, dur: 25, delay: 1,  op: 0.22 },
  { left: '38%',  size: 2,   dur: 21, delay: 5,  op: 0.18 },
  { left: '45%',  size: 1.5, dur: 30, delay: 9,  op: 0.25 },
  { left: '53%',  size: 2.2, dur: 24, delay: 2,  op: 0.28 },
  { left: '60%',  size: 1.8, dur: 20, delay: 6,  op: 0.2  },
  { left: '68%',  size: 2,   dur: 27, delay: 4,  op: 0.22 },
  { left: '75%',  size: 1.5, dur: 23, delay: 8,  op: 0.3  },
  { left: '82%',  size: 2.5, dur: 26, delay: 0,  op: 0.18 },
  { left: '90%',  size: 1.8, dur: 18, delay: 10, op: 0.25 },
  { left: '3%',   size: 2,   dur: 32, delay: 12, op: 0.15 },
  { left: '50%',  size: 1.5, dur: 29, delay: 14, op: 0.2  },
  { left: '95%',  size: 2,   dur: 21, delay: 6,  op: 0.22 },
];

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Floating ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            '--p-opacity': p.op,
          }}
        />
      ))}

      {/* Film grain overlay */}
      <div className="grain-overlay" />
    </div>
  )
}

export default BackgroundAnimation
