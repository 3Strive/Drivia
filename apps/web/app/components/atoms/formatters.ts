// ─── FORMATTERS ───────────────────────────────────────────────────────────────
export const fmt = (n: number) => `₦${n.toLocaleString('en-NG')}`;

export const fmtShort = (n: number) =>
  n >= 1_000_000
    ? `₦${(n / 1_000_000).toFixed(1)}M`
    : `₦${(n / 1000).toFixed(0)}K`;
