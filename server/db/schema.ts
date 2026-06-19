import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";
import { defineConfig } from "drizzle-kit";

// Config
export default defineConfig({
	dialect: "sqlite",
	schema: "@/schema/db/schema.ts",
});

// ============================
// Tablas Maestras
// ============================
export const Genero = sqliteTable("Genero", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});

export const SubGenero = sqliteTable("SubGenero", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});

export const Coleccion = sqliteTable("Coleccion", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});

export const Estado = sqliteTable("Estado", {
	nombre: text("nombre").notNull().unique(),
});

// ============================
// Entidades
// ============================
export const Editorial = sqliteTable("Editorial", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull(),
});

export const Libro = sqliteTable("Libro", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	titulo: text("titulo").notNull(),
	idGenero: integer("idGenero")
		.references(() => Genero.id, { onDelete: "restrict" })
		.notNull(),
	idSubgenero: integer("idSubgenero").references(() => SubGenero.id, { onDelete: "restrict" }),
	idEditorial: text("idEditorial").references(() => Editorial.id, { onDelete: "restrict" }),
	isbn: text("isbn").notNull().unique(),
	idColeccion: text("idColeccion").references(() => Coleccion.id, { onDelete: "restrict" }),
	coverImgPath: text("coverImgPath"),
	anyoEscritura: integer("anyoEscritura"),
	anyoEdicion: integer("anyoEdicion"),
	createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
});

export const Contacto = sqliteTable("Contacto", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull().unique(),
	metodoContacto: text("metodo_contacto").notNull().unique(),
});

export const Autor = sqliteTable("Autor", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull(),
	apellidos: text("apellidos"),
});

export const Usuario = sqliteTable("Usuario", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull().unique(),
	password: text("password").notNull(),
});

export const Nota = sqliteTable("Nota", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	idUsuario: text("idUsuario")
		.references(() => Usuario.id)
		.notNull(),
	idLibro: text("idLibro")
		.references(() => Libro.id)
		.notNull(),
	pagina: integer("pagina"),
	texto: text("texto"),
	createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
});

// ===============================
// Tablas intermedias
// ===============================

export const LibroContacto = sqliteTable("LibroContacto", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	idLibro: text("idLibro").references(() => Libro.id, { onDelete: "cascade" }),
	idContacto: text("idContacto").references(() => )
});
