import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-secondary': 'var(--gradient-secondary)',
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-neon': 'var(--gradient-neon)',
        'gradient-gaming': 'var(--gradient-gaming)',
        'gradient-shimmer': 'var(--gradient-shimmer)',
      },
      boxShadow: {
        'neon': 'var(--shadow-neon)',
        'orange': 'var(--shadow-orange)',
        'elegant': 'var(--shadow-elegant)',
        'glow': 'var(--shadow-glow)',
        'accent': 'var(--shadow-accent)',
        'card': 'var(--shadow-card)',
      },
      transitionTimingFunction: {
        'smooth': 'var(--transition-smooth)',
        'bounce': 'var(--transition-bounce)',
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        // Accordion Animations
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" }
        },
        
        // Fade Animations
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)"
          },
          "100%": {
            opacity: "0",
            transform: "translateY(10px)"
          }
        },
        
        // Scale Animations
        "scale-in": {
          "0%": {
            transform: "scale(0.95)",
            opacity: "0"
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1"
          }
        },
        "scale-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" }
        },
        
        // Slide Animations
        "slide-in-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" }
        },
        "slide-out-right": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(100%)" }
        },
        
        // Gaming Specific Animations
        "pulse-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--primary) / 0.3)" 
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(var(--primary) / 0.6), 0 0 60px hsl(var(--primary) / 0.3)" 
          }
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        },
        "neon-pulse": {
          "0%, 100%": { 
            textShadow: "0 0 5px hsl(var(--primary)), 0 0 10px hsl(var(--primary)), 0 0 15px hsl(var(--primary))" 
          },
          "50%": { 
            textShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary)), 0 0 40px hsl(var(--primary))" 
          }
        },
        "ripple": {
          "0%": { 
            width: "0px",
            height: "0px",
            opacity: "0.5"
          },
          "100%": { 
            width: "500px",
            height: "500px",
            opacity: "0",
            transform: "translate(-50%, -50%)"
          }
        },
        "gradient-shift": {
          "0%, 100%": { 
            backgroundPosition: "0% 50%"
          },
          "50%": { 
            backgroundPosition: "100% 50%"
          }
        },
        "particle-fade": {
          "0%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)"
          },
          "100%": {
            opacity: "0",
            transform: "translate(-50%, -50%) scale(0.3) translateY(-20px)"
          }
        }
      },
      animation: {
        // Basic Animations
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "fade-out": "fade-out 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "scale-out": "scale-out 0.2s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-out-right": "slide-out-right 0.3s ease-out",
        
        // Gaming Animations
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "ripple": "ripple 0.6s ease-out",
        "gradient-shift": "gradient-shift 4s ease-in-out infinite",
        "particle-fade": "particle-fade 1s ease-out forwards",
        
        // Combined Animations
        "enter": "fade-in 0.3s ease-out, scale-in 0.2s ease-out",
        "exit": "fade-out 0.3s ease-out, scale-out 0.2s ease-out"
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    function({ addUtilities }) {
      const newUtilities = {
        // Interactive Elements
        '.story-link': {
          '@apply relative inline-block after:content-[""] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left': {}
        },
        
        // Hover Scale Animation
        '.hover-scale': {
          '@apply transition-transform duration-200 hover:scale-105': {}
        },
        
        // Gaming Card Hover
        '.gaming-card': {
          '@apply transition-all duration-300 hover:shadow-neon hover:transform hover:scale-105 hover:border-primary/50': {}
        },
        
        // Neon Button
        '.neon-button': {
          '@apply relative overflow-hidden bg-gradient-primary text-primary-foreground hover:shadow-neon transition-all duration-300 hover:scale-105': {}
        },
        
        // Shimmer Effect
        '.shimmer': {
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.2), transparent)',
          backgroundSize: '200% 100%',
          '@apply animate-shimmer': {}
        },
        
        // Glass Effect
        '.glass': {
          '@apply bg-card/20 backdrop-blur-md border border-border/50': {}
        },
        
        // Floating Animation
        '.float': {
          '@apply animate-float': {}
        },
        
        // Neon Text
        '.neon-text': {
          '@apply text-primary animate-neon-pulse': {}
        },
        
        // Animated Gradient Text
        '.gradient-text-animated': {
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))',
          backgroundSize: '300% 100%',
          '@apply bg-clip-text text-transparent animate-gradient-shift': {}
        }
      }
      
      addUtilities(newUtilities)
    }
  ],
} satisfies Config;
