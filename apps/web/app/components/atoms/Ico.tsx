import React from 'react';

// ─── BASE SVG ICON ────────────────────────────────────────────────────────────
interface IcoProps {
  d: string | string[];
  size?: number;
  stroke?: string;
  fill?: string;
  sw?: number;
}

export const Ico = ({
  d,
  size = 16,
  stroke = 'currentColor',
  fill = 'none',
  sw = 2,
}: IcoProps): JSX.Element => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw}
  >
    {Array.isArray(d) ? (
      d.map((p, i) => <path key={i} d={p} />)
    ) : (
      <path d={d} />
    )}
  </svg>
);
