/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			spacing: {
				128: "32rem",
				144: "36rem"
			},
			colors: {
				"text-black": "#404040"
			}
		}
	},
	plugins: []
};
