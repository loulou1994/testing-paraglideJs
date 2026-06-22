import { paraglideVitePlugin } from "@inlang/paraglide-js";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
	resolve: { tsconfigPaths: true },
	plugins: [
		devtools(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/paraglide",
			strategy: ["cookie", "url", "preferredLanguage", "baseLocale"],
			// urlPatterns: [
			// 	// dedicated root pattern avoids a redirect loop on "/"
			// 	{
			// 		pattern: "/",
			// 		localized: [
			// 			["de", "/de"],
			// 			["en", "/"],
			// 		],
			// 	},
			// 	{
			// 		pattern: "/:path(.*)?",
			// 		localized: [
			// 			["de", "/de/:path(.*)?"], // specific/prefixed first
			// 			["en", "/:path(.*)?"], // catch-all fallback last
			// 		],
			// 	},
			// ],
		}),
		tailwindcss(),
		tanstackStart({
			server: {
				entry: "./src/server.ts",
			},
		}),
		viteReact(),
	],
});

export default config;
