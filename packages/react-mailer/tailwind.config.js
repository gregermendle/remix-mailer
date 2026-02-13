/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", ["rm-dark"]],
  content: ["./src/**/*.{ts,tsx}"],
  prefix: "rm-",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "Oxygen-Sans",
          "Ubuntu",
          "Cantarell",
          "'Helvetica Neue'",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--rm-border))",
        input: "hsl(var(--rm-input))",
        ring: "hsl(var(--rm-ring))",
        background: "hsl(var(--rm-background))",
        foreground: "hsl(var(--rm-foreground))",
        primary: {
          DEFAULT: "hsl(var(--rm-primary))",
          foreground: "hsl(var(--rm-primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--rm-secondary))",
          foreground: "hsl(var(--rm-secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--rm-destructive))",
          foreground: "hsl(var(--rm-destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--rm-muted))",
          foreground: "hsl(var(--rm-muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--rm-accent))",
          foreground: "hsl(var(--rm-accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--rm-popover))",
          foreground: "hsl(var(--rm-popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--rm-card))",
          foreground: "hsl(var(--rm-card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--rm-radius)",
        md: "calc(var(--rm-radius) - 2px)",
        sm: "calc(var(--rm-radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-in",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
