const colors = require('tailwindcss/colors')
let plugin = require('tailwindcss/plugin')

module.exports = {
	content: [
		"./src/_includes/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
		"./src/blog/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
		"./src/pages/**/*.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
		"./src/index.{html,md,11ty.js,liquid,njk,hbs,mustache,ejs,haml,pug}",
	],
	darkMode: "class",
	theme: {
		extend: {
			screens: {
				"2xl": { min: "1535px" },
				xl: { min: "1279px" },
				lg: { min: "1023px" },
				md: { min: "850px" },
				smd: { min: "715px" },
				sm: { min: "639px" },
				"only-sm": { max: "639px" },
			},
			maxWidth: {
				xxs: "13rem",
				"1/2": "50%",
			},
			fontFamily: {
				sans: [
					"Inter var",
					"Inter",
					"ui-sans-serif",
					"system-ui",
					"Arial",
					"sans-serif",
				],
			},
		},
		plugins: [
			require("@themesberg/flowbite/plugin"),
			plugin(function ({ addVariant }) {
				// Add a `third` variant, ie. `third:pb-0`
				addVariant("second-last", "&:last-nth-child(2)");
			}),
		],
	},
};
