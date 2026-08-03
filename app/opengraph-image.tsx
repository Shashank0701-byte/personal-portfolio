import { ImageResponse } from 'next/og';

export const alt = 'Shashank Chakraborty — Backend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CHIPS = ['FastAPI', 'Neo4j', 'Node.js', 'Docker', 'AWS', 'PostgreSQL'];

// Rendered by satori, which supports a narrow slice of CSS: every element with
// more than one child needs an explicit display:flex, and only px units are safe.
// Kept on the default font on purpose — a card that always renders beats a
// prettier one that breaks the build when a font fetch fails.
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
          padding: '68px 72px',
          backgroundColor: '#0a0a0f',
          backgroundImage:
            'radial-gradient(circle at 78% 18%, rgba(167,139,250,0.24), transparent 55%)',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#a78bfa', fontWeight: 600 }}>
            BACKEND DEVELOPER
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 82,
              fontWeight: 800,
              color: '#ffffff',
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            Shashank Chakraborty
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 30,
              color: 'rgba(255,255,255,0.62)',
              lineHeight: 1.4,
              maxWidth: 840,
            }}
          >
            Systems that hold under load — plus a live AWS IAM escalation analyzer you can run in
            the browser.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            {CHIPS.map((chip) => (
              <div
                key={chip}
                style={{
                  display: 'flex',
                  marginRight: 12,
                  padding: '9px 18px',
                  borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.14)',
                  color: 'rgba(255,255,255,0.66)',
                  fontSize: 21,
                }}
              >
                {chip}
              </div>
            ))}
          </div>
          <PixelMark />
        </div>
      </div>
    ),
    size,
  );
}

/** The same blocky S as the favicon, scaled up as a quiet corner mark. */
function PixelMark() {
  const b = 13;
  const rows: [number, number, number][] = [
    [0, 0, 5],
    [1, 0, 1],
    [2, 0, 1],
    [3, 0, 5],
    [4, 4, 1],
    [5, 4, 1],
    [6, 0, 5],
  ];

  return (
    <div style={{ display: 'flex', position: 'relative', width: b * 5, height: b * 7 }}>
      {rows.map(([row, startCol, span]) => (
        <div
          key={row}
          style={{
            position: 'absolute',
            top: row * b,
            left: startCol * b,
            width: span * b,
            height: b,
            backgroundColor: 'rgba(167,139,250,0.55)',
          }}
        />
      ))}
    </div>
  );
}
