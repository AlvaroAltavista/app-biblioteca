import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	// Directorio donde están los test E2E
	testDir: "./test/e2e",

	// Timeout global para cada test
	timeout: 30 * 1000,

	// Configuración de espera para elementos
	expect: {
		timeout: 5000,
	},

	// Número de workers paralelos
	fullyParallel: true,
	workers: process.env.CI ? 1 : undefined,

	// Reportes de tests
	reporter: [["html"], ["list"]],

	// URL base para test
	use: {
		baseURL: "https://localhost:3000",
		trace: "on-first-retry",
	},

	// Configuración de navegadores
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],

	// Antes de ejecutar tests, inicia el servidor de desarrollo
	webServer: {
		command: "npm run dev",
		url: "http://localhost:3000",
		reuseExistingServer: !process.env.CI,
	},
});
