import { HstVue } from "@histoire/plugin-vue";
import { HstNuxt } from "@histoire/plugin-nuxt";
import { defineConfig } from "histoire";

export default defineConfig({
	plugins: [HstVue(), HstNuxt()],
});
