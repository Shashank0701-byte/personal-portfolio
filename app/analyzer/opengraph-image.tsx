import { ImageResponse } from 'next/og';

export const alt =
  'Live AWS IAM privilege escalation analyzer — Intern_A reaches ProductionDB in four hops';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CHAIN = [
  { name: 'Intern_A', rel: 'ASSIGNED', kind: 'user' },
  { name: 'InternRole', rel: 'ASSUME', kind: 'role' },
  { name: 'DevRole', rel: 'ASSUME', kind: 'role' },
  { name: 'DBAccessRole', rel: 'ACCESS', kind: 'role' },
  { name: 'ProductionDB', rel: null, kind: 'target' },
] as const;

const BORDER = {
  user: 'rgba(125,211,252,0.75)',
  role: 'rgba(167,139,250,0.75)',
  target: 'rgba(248,113,113,0.95)',
} as const;

// The preview card is the escalation result itself, not a logo — someone scrolling
// a feed sees an intern reaching production before they decide whether to click.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '62px 64px',
          backgroundColor: '#0a0a0f',
          backgroundImage:
            'radial-gradient(circle at 88% 88%, rgba(248,113,113,0.20), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 20, letterSpacing: 5, color: '#a78bfa', fontWeight: 600 }}>
            SHADOW PERMISSION ANALYZER
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 62,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: -1.5,
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            An intern can reach production in four hops.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {CHAIN.map((node) => (
            <div key={node.name} style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: 186,
                  padding: '13px 14px',
                  borderRadius: 6,
                  border: `2px solid ${BORDER[node.kind]}`,
                  backgroundColor:
                    node.kind === 'target' ? 'rgba(248,113,113,0.14)' : 'rgba(255,255,255,0.035)',
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    letterSpacing: 2,
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {node.kind === 'target' ? 'RESOURCE · SENS 5' : node.kind.toUpperCase()}
                </div>
                <div style={{ marginTop: 6, fontSize: 21, color: '#ffffff' }}>{node.name}</div>
              </div>

              {node.rel && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 26,
                  }}
                >
                  {/* Sized for a feed thumbnail, where a hairline arrow disappears. */}
                  <div style={{ fontSize: 36, color: 'rgba(255,255,255,0.5)' }}>›</div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', fontSize: 23, color: 'rgba(255,255,255,0.5)' }}>
          Breadth-first traversal running live in your browser · risk score 40.00 · CRITICAL
        </div>
      </div>
    ),
    size,
  );
}
