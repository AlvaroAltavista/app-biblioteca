import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { defineConfig } from "drizzle-kit";

// Config
export default defineConfig({
	dialect: "sqlite",
	schema: "@/schema/db/schema.ts",
});

// ============================
// Tablas Maestras
// ============================
export const genero = sqliteTable("genero", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});

export const subGenero = sqliteTable("subGenero", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});

export const coleccion = sqliteTable("coleccion", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});

// ============================
// Entidades
// ============================
export const editorial = sqliteTable("editorial", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull(),
});

export const libro = sqliteTable("libro", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	titulo: text("titulo").notNull(),
});
