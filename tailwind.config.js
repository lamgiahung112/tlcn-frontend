/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,tsx}"],
	theme: {
		extend: {
			keyframes: {
				scrollDown: {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(0)" },
				},
			},
			animation: {
				"spin-cubic": "spin 1s cubic-bezier(0.25, 0.1, 0.25, 1) infinite",
				"scroll-down": "scrollDown 0.15s linear forwards",
			},
			height: {
				"header-height": "60px",
				"minus-header": "calc(100vh - 60px)",
			},
			margin: {
				"header-height": "60px",
			},
			colors: {
				primary: {
					light: "#62C4C3", // Light teal
					DEFAULT: "#00A69C", // Teal
					dark: "#008F86", // Dark teal
				},
				secondary: {
					light: "#FFA726", // Light orange
					DEFAULT: "#F57C00", // Orange
					dark: "#EF6C00", // Dark orange
				},
				accent: {
					light: "#FF94C2", // Light pink
					DEFAULT: "#FF4081", // Pink
					dark: "#F50057", // Dark pink
				},
			},
		},
	},
	plugins: [],
}
