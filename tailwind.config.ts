import plugin from "tailwindcss/plugin";

const darkTheme = {
  "--radius": "0.625rem",
  "--background": "oklch(0.145 0 0)",
  "--foreground": "oklch(0.985 0 0)",
  "--surface-canvas": "oklch(0.08 0 0)",
  "--surface-hero": "oklch(0.18 0 0)",
  "--surface-panel": "oklch(0.22 0 0 / 80%)",
  "--surface-panel-muted": "oklch(1 0 0 / 10%)",
  "--brand-primary": "oklch(0.82 0.14 82)",
  "--brand-primary-foreground": "oklch(0.08 0 0)",
  "--card": "oklch(0.205 0 0)",
  "--card-foreground": "oklch(0.985 0 0)",
  "--popover": "oklch(0.205 0 0)",
  "--popover-foreground": "oklch(0.985 0 0)",
  "--primary": "oklch(0.922 0 0)",
  "--primary-foreground": "oklch(0.205 0 0)",
  "--secondary": "oklch(0.269 0 0)",
  "--secondary-foreground": "oklch(0.985 0 0)",
  "--muted": "oklch(0.269 0 0)",
  "--muted-foreground": "oklch(0.708 0 0)",
  "--accent": "oklch(0.269 0 0)",
  "--accent-foreground": "oklch(0.985 0 0)",
  "--destructive": "oklch(0.577 0.245 27.325)",
  "--border": "oklch(1 0 0 / 10%)",
  "--input": "oklch(1 0 0 / 15%)",
  "--ring": "oklch(0.82 0.14 205)",
  "--chart-1": "oklch(0.646 0.222 41.116)",
  "--chart-2": "oklch(0.6 0.118 184.704)",
  "--chart-3": "oklch(0.398 0.07 227.392)",
  "--chart-4": "oklch(0.828 0.189 84.429)",
  "--chart-5": "oklch(0.769 0.188 70.08)",
  "--sidebar": "oklch(0.205 0 0)",
  "--sidebar-foreground": "oklch(0.985 0 0)",
  "--sidebar-primary": "oklch(0.488 0.243 264.376)",
  "--sidebar-primary-foreground": "oklch(0.985 0 0)",
  "--sidebar-accent": "oklch(0.269 0 0)",
  "--sidebar-accent-foreground": "oklch(0.985 0 0)",
  "--sidebar-border": "oklch(1 0 0 / 10%)",
  "--sidebar-ring": "oklch(0.556 0 0)",
  "--shadow-card-lifted": "0 20px 40px rgb(0 0 0 / 60%)",
};

const lightTheme = {
  ...darkTheme,
  "--background": "oklch(0.96 0 0)",
  "--foreground": "oklch(0.16 0 0)",
  "--surface-canvas": "oklch(0.94 0 0)",
  "--surface-hero": "oklch(0.84 0 0)",
  "--surface-panel": "oklch(0.98 0 0 / 92%)",
  "--surface-panel-muted": "oklch(0.18 0 0 / 8%)",
  "--brand-primary": "oklch(0.76 0.15 82)",
  "--brand-primary-foreground": "oklch(0.12 0 0)",
  "--card": "oklch(0.98 0 0)",
  "--card-foreground": "oklch(0.16 0 0)",
  "--popover": "oklch(0.98 0 0)",
  "--popover-foreground": "oklch(0.16 0 0)",
  "--primary": "oklch(0.18 0 0)",
  "--primary-foreground": "oklch(0.98 0 0)",
  "--secondary": "oklch(0.9 0 0)",
  "--secondary-foreground": "oklch(0.2 0 0)",
  "--muted": "oklch(0.88 0 0)",
  "--muted-foreground": "oklch(0.38 0 0)",
  "--accent": "oklch(0.9 0 0)",
  "--accent-foreground": "oklch(0.2 0 0)",
  "--border": "oklch(0.2 0 0 / 14%)",
  "--input": "oklch(0.2 0 0 / 14%)",
  "--ring": "oklch(0.42 0.08 205)",
  "--shadow-card-lifted": "0 20px 40px rgb(0 0 0 / 16%)",
};

const config = {
  darkMode: ["class", ".dark"],
  content: ["./src/**/*.{html,ts,tsx}", "./styles/**/*.css"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "surface-canvas": "var(--surface-canvas)",
        "surface-hero": "var(--surface-hero)",
        "surface-panel": "var(--surface-panel)",
        "surface-panel-muted": "var(--surface-panel-muted)",
        "brand-primary": "var(--brand-primary)",
        "brand-primary-foreground": "var(--brand-primary-foreground)",
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        popover: "var(--popover)",
        "popover-foreground": "var(--popover-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        destructive: "var(--destructive)",
      },
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "calc(var(--radius) + 4px)",
      },
      boxShadow: {
        "brand-glow": "0 0 20px color-mix(in oklch, var(--brand-primary), transparent 70%)",
        "panel-glow": "0 0 30px color-mix(in oklch, var(--ring), transparent 60%)",
        "card-lifted": "var(--shadow-card-lifted)",
      },
      letterSpacing: {
        "brand-wide": "0.4em",
        label: "0.2em",
      },
    },
  },
  plugins: [
    plugin(({ addBase, addUtilities }) => {
      addBase({
        ":root": darkTheme,
        ".dark": darkTheme,
        ".light": lightTheme,
        "*": {
          borderColor: "var(--border)",
          outlineColor: "color-mix(in oklch, var(--ring), transparent 50%)",
        },
        body: {
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
        },
      });

      addUtilities({
        ".text-shadow-sm": {
          textShadow: "0 1px 2px rgb(0 0 0 / 50%)",
        },
        ".hero-outline-text": {
          "-webkit-text-stroke": "1px rgb(255 255 255 / 20%)",
        },
        ".light .text-white": {
          color: "var(--foreground)",
        },
        ".light .bg-white": {
          backgroundColor: "var(--foreground)",
        },
      });
    }),
  ],
};

export default config;
