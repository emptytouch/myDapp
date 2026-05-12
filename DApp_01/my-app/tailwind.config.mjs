/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        tech: {
          surface: "#030712",
          cyan: "#22d3ee",
          "cyan-bright": "#67e8f9",
          "cyan-deep": "#0891b2",
          violet: "#818cf8",
          "violet-deep": "#6366f1",
          muted: "#94a3b8",
        },
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(34, 211, 238, 0.35), 0 0 48px rgba(34, 211, 238, 0.12)",
        "glow-cyan-sm": "0 0 12px rgba(34, 211, 238, 0.28)",
        "inner-tech": "inset 0 1px 0 0 rgba(255, 255, 255, 0.06)",
      },
      fontFamily: {
        wq: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        'marquee': 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
    },
  },
  plugins: [],
};