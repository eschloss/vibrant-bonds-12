
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FF2688', // Neon Fuchsia
					foreground: '#fff'
				},
				secondary: {
					DEFAULT: '#38D1BF', // Bright Aqua
					foreground: '#fff'
				},
				destructive: {
					DEFAULT: '#E5484D',
					foreground: '#fff'
				},
				muted: {
					DEFAULT: '#741ADD1A',
					foreground: '#741ADD'
				},
				accent: {
					DEFAULT: '#741ADD', // Electric Violet
					foreground: '#fff'
				},
				popover: {
					DEFAULT: '#15191C', // Gunmetal Black
					foreground: '#fff'
				},
				card: {
					DEFAULT: '#fff',
					foreground: '#15191C'
				},
				sidebar: {
					DEFAULT: '#15191C',
					foreground: '#fff',
					primary: '#FF2688',
					'primary-foreground': '#fff',
					accent: '#741ADD',
					'accent-foreground': '#fff',
					border: '#15191C',
					ring: '#741ADD'
				},
				// Brand Colors
				pulse: {
					coral: '#FF2688',    // Neon Fuchsia
					purple: '#741ADD',   // Electric Violet
					blue: '#38D1BF',     // Bright Aqua
					teal: '#38D1BF',
					pink: '#FF2688',
				},
				black: '#15191C',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Lexend', 'system-ui', 'sans-serif'],
				display: ['Space Grotesk', 'system-ui', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out forwards',
				'fade-out': 'fade-out 0.5s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out forwards',
				'slide-down': 'slide-down 0.5s ease-out forwards',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'float': 'float 5s ease-in-out infinite',
				'spin-slow': 'spin-slow 12s linear infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite'
			},
			boxShadow: {
				'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
				'neobrutal': '5px 5px 0px rgba(0, 0, 0, 0.8)',
			},
			backdropBlur: {
				'glass': 'blur(8px)',
			},
			backgroundImage: {
				// Overwrite with brand gradient
				'gradient-hero': 'linear-gradient(90deg, #FF2688 0%, #741ADD 50%, #38D1BF 100%)',
				'gradient-cta': 'linear-gradient(90deg, #FF2688 0%, #741ADD 100%)',
				'gradient-blue': 'linear-gradient(90deg, #741ADD 0%, #38D1BF 100%)',
				'gradient-main': 'linear-gradient(90deg, #FF2688 0%, #741ADD 50%, #38D1BF 100%)',
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
