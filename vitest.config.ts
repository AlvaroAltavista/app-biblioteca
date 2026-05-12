import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
	plugins: [vue()],
	test: {
		environment: "happy-dom",
		setupFiles: ["./test/setup.ts"],
		include: ["test/**/*.test.ts", "test/**/*.spec.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json"],
			exclude: ["node_modules/", "test/", "dist/", ".nuxt/"],
		},
		globals: true,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./"),
		},
	},
});
