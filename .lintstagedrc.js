module.exports = {
  "!(*seed).{ts,js,tsx,jsx,mdx}": "eslint --fix",
  "*.{ts,js,tsx,jsx,md,mdx,html,json,yml,yaml}": "cspell",
  "*.{ts,js,tsx,jsx,md,mdx,html,json,yml,yaml}": "prettier --write",
};
