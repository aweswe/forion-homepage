'use client'

const items = [
  'Multi-Agent Orchestration',
  'Edge-Native Inference',
  'Vector Memory',
  'Real-Time Observability',
  'Provider-Agnostic Routing',
  'Zero-Latency Execution',
  'AI Infrastructure',
  'Autonomous Systems',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
        padding: '14px 0',
        background: '#000',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '3rem',
          animation: 'marquee-scroll 30s linear infinite',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#444',
              flexShrink: 0,
            }}
          >
            {item}
            <span style={{ marginLeft: '3rem', color: '#222' }}>◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
