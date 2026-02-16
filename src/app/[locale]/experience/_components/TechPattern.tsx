interface TechPatternProps {
  variant: "circuit" | "storefront" | "nodes";
}

function CircuitPattern() {
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Central IC chip with pin legs */}
      <rect x="95" y="95" width="60" height="44" rx="2" stroke="var(--color-grad-2)" strokeWidth="2" />
      {/* Pin notch */}
      <path d="M115 95 A5 5 0 0 1 125 95" stroke="var(--color-grad-2)" strokeWidth="1.5" />
      {/* Left pins */}
      {[102, 110, 118, 126].map(y => (
        <line key={`lp-${y}`} x1="80" y1={y} x2="95" y2={y} stroke="var(--color-grad-2)" strokeWidth="1.5" />
      ))}
      {/* Right pins */}
      {[102, 110, 118, 126].map(y => (
        <line key={`rp-${y}`} x1="155" y1={y} x2="170" y2={y} stroke="var(--color-grad-2)" strokeWidth="1.5" />
      ))}
      {/* Pin pads (left) */}
      {[102, 110, 118, 126].map(y => (
        <rect key={`lpad-${y}`} x="74" y={y - 3} width="6" height="6" rx="1" fill="var(--color-grad-2)" />
      ))}
      {/* Pin pads (right) */}
      {[102, 110, 118, 126].map(y => (
        <rect key={`rpad-${y}`} x="170" y={y - 3} width="6" height="6" rx="1" fill="var(--color-grad-2)" />
      ))}

      {/* Smaller IC chip (top-right) */}
      <rect x="195" y="38" width="40" height="28" rx="2" stroke="var(--color-grad-1)" strokeWidth="1.5" />
      <path d="M210 38 A4 4 0 0 1 218 38" stroke="var(--color-grad-1)" strokeWidth="1" />
      {/* Top chip bottom pins */}
      {[204, 214, 224].map(x => (
        <line key={`tp-${x}`} x1={x} y1="66" x2={x} y2="78" stroke="var(--color-grad-1)" strokeWidth="1.5" />
      ))}
      {[204, 214, 224].map(x => (
        <rect key={`tpad-${x}`} x={x - 3} y="78" width="6" height="6" rx="1" fill="var(--color-grad-1)" />
      ))}

      {/* Traces from central chip to top-right chip */}
      <path d="M176 102 H190 V52 H195" stroke="var(--color-grad-3)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M176 110 H185 V60 H195" stroke="var(--color-grad-1)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Traces from central chip going left */}
      <path d="M74 102 H50 V60 H30" stroke="var(--color-grad-1)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M74 118 H40 V170" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M74 126 H55 V200 H80" stroke="var(--color-grad-3)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Traces from central chip going right/down */}
      <path d="M176 118 H210 V160 H240" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M176 126 H200 V180 H170" stroke="var(--color-grad-1)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Through-hole vias (double circle) */}
      {[
        [30, 60],
        [240, 160],
        [170, 180],
        [40, 170],
        [80, 200],
        [214, 84]
      ].map(([cx, cy], i) => (
        <g key={`via-${i}`}>
          <circle cx={cx} cy={cy} r="6" stroke={i % 2 === 0 ? "var(--color-grad-1)" : "var(--color-grad-2)"} strokeWidth="1" />
          <circle cx={cx} cy={cy} r="2.5" fill={i % 2 === 0 ? "var(--color-grad-1)" : "var(--color-grad-2)"} />
        </g>
      ))}

      {/* Resistor (bottom-left area) */}
      <path
        d="M80 210 H100 L104 204 L112 216 L120 204 L128 216 L132 210 H152"
        stroke="var(--color-grad-3)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect key="rpad1" x="74" y="207" width="6" height="6" rx="1" fill="var(--color-grad-3)" />
      <rect key="rpad2" x="152" y="207" width="6" height="6" rx="1" fill="var(--color-grad-3)" />

      {/* Capacitor (bottom-right) */}
      <line x1="200" y1="210" x2="200" y2="230" stroke="var(--color-grad-1)" strokeWidth="2" />
      <line x1="210" y1="210" x2="210" y2="230" stroke="var(--color-grad-1)" strokeWidth="2" />
      <line x1="185" y1="220" x2="200" y2="220" stroke="var(--color-grad-1)" strokeWidth="1.5" />
      <line x1="210" y1="220" x2="225" y2="220" stroke="var(--color-grad-1)" strokeWidth="1.5" />

      {/* More traces (bottom routing) */}
      <path d="M158 210 H170 V240 H120" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M185 220 H170 V250 H90" stroke="var(--color-grad-1)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M225 220 H250 V250" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Additional vias at trace endpoints */}
      {[
        [120, 240],
        [90, 250],
        [250, 250]
      ].map(([cx, cy], i) => (
        <g key={`via2-${i}`}>
          <circle cx={cx} cy={cy} r="5" stroke="var(--color-grad-3)" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="2" fill="var(--color-grad-3)" />
        </g>
      ))}

      {/* Top-left corner traces */}
      <path d="M20 30 H60 V50" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 40 H50 V70 H74" stroke="var(--color-grad-3)" strokeWidth="1.5" strokeLinecap="round" />
      <g>
        <circle cx="60" cy="50" r="5" stroke="var(--color-grad-2)" strokeWidth="1" />
        <circle cx="60" cy="50" r="2" fill="var(--color-grad-2)" />
      </g>

      {/* Pad row (top edge, like header pins) */}
      {[30, 42, 54, 66, 78].map(x => (
        <rect key={`hpad-${x}`} x={x} y="18" width="5" height="8" rx="1" stroke="var(--color-grad-1)" strokeWidth="1" fill="none" />
      ))}
    </svg>
  );
}

function StorefrontPattern() {
  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shopping cart */}
      <path
        d="M30 50 L50 50 L70 110 H130 L140 70 H60"
        stroke="var(--color-grad-1)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="80" cy="125" r="6" stroke="var(--color-grad-1)" strokeWidth="1.5" />
      <circle cx="118" cy="125" r="6" stroke="var(--color-grad-1)" strokeWidth="1.5" />

      {/* Price tag */}
      <path d="M180 30 L220 30 L240 50 L220 70 L180 70 Z" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="195" cy="50" r="4" fill="var(--color-grad-2)" />
      <line x1="240" y1="50" x2="260" y2="50" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinecap="round" />

      {/* Storefront awning */}
      <path d="M40 160 H160 V175 C40 175 40 195 100 175" stroke="var(--color-grad-3)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 175 C60 195 80 175 100 195 C120 175 140 195 160 175" stroke="var(--color-grad-3)" strokeWidth="1.5" />
      <rect x="40" y="195" width="120" height="50" rx="2" stroke="var(--color-grad-3)" strokeWidth="1.5" />
      <rect x="75" y="215" width="30" height="30" rx="1" stroke="var(--color-grad-3)" strokeWidth="1" />

      {/* Package box 1 */}
      <rect x="190" y="120" width="50" height="45" rx="3" stroke="var(--color-grad-1)" strokeWidth="1.5" />
      <line x1="215" y1="120" x2="215" y2="165" stroke="var(--color-grad-1)" strokeWidth="1" />
      <path d="M200 120 V112 H230 V120" stroke="var(--color-grad-1)" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Package box 2 (smaller, offset) */}
      <rect x="210" y="190" width="40" height="35" rx="3" stroke="var(--color-grad-2)" strokeWidth="1.5" />
      <line x1="230" y1="190" x2="230" y2="225" stroke="var(--color-grad-2)" strokeWidth="1" />
      <path d="M218 190 V184 H242 V190" stroke="var(--color-grad-2)" strokeWidth="1.5" strokeLinejoin="round" />

      {/* Star ratings */}
      {[30, 52, 74].map((x, i) => (
        <path
          key={`star-${i}`}
          d={`M${x} 260 L${x + 4} 250 L${x + 8} 260 L${x} 254 L${x + 8} 254 Z`}
          fill={i < 2 ? "var(--color-grad-1)" : "none"}
          stroke="var(--color-grad-1)"
          strokeWidth="1"
        />
      ))}

      {/* Floating dollar signs as small decorative marks */}
      <text x="255" y="265" fontSize="16" fill="var(--color-grad-2)" fontFamily="monospace">
        $
      </text>
      <text x="155" y="145" fontSize="12" fill="var(--color-grad-1)" fontFamily="monospace">
        $
      </text>
    </svg>
  );
}

function NodesPattern() {
  const nodes: { x: number; y: number; r: number }[] = [
    { x: 60, y: 50, r: 12 },
    { x: 160, y: 40, r: 8 },
    { x: 240, y: 70, r: 10 },
    { x: 40, y: 140, r: 8 },
    { x: 130, y: 120, r: 14 },
    { x: 220, y: 150, r: 10 },
    { x: 80, y: 210, r: 10 },
    { x: 180, y: 220, r: 12 },
    { x: 250, y: 240, r: 8 },
    { x: 140, y: 260, r: 6 },
    { x: 30, y: 260, r: 7 },
    { x: 260, y: 160, r: 6 }
  ];

  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [0, 4],
    [1, 4],
    [2, 5],
    [3, 4],
    [4, 5],
    [3, 6],
    [4, 7],
    [5, 7],
    [5, 11],
    [6, 7],
    [7, 8],
    [6, 10],
    [7, 9],
    [9, 10],
    [8, 11]
  ];

  return (
    <svg width="280" height="280" viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={`edge-${i}`}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke={i % 2 === 0 ? "var(--color-grad-1)" : "var(--color-grad-2)"}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => (
        <circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          stroke={i % 3 === 0 ? "var(--color-grad-1)" : i % 3 === 1 ? "var(--color-grad-2)" : "var(--color-grad-3)"}
          strokeWidth="1.5"
          fill="none"
        />
      ))}

      {/* Inner dots for larger nodes */}
      {nodes
        .filter(n => n.r >= 10)
        .map((node, i) => (
          <circle key={`inner-${i}`} cx={node.x} cy={node.y} r={3} fill={i % 2 === 0 ? "var(--color-grad-1)" : "var(--color-grad-3)"} />
        ))}
    </svg>
  );
}

export default function TechPattern({ variant }: TechPatternProps) {
  return (
    <div className="pointer-events-none absolute -top-4 right-0 opacity-15 md:top-1/2 md:-translate-y-1/2" aria-hidden="true">
      {variant === "circuit" && <CircuitPattern />}
      {variant === "storefront" && <StorefrontPattern />}
      {variant === "nodes" && <NodesPattern />}
    </div>
  );
}
