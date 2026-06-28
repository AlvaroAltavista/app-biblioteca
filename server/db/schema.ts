import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// ============================
// Tablas Maestras
// ============================
export const Genero = sqliteTable("Genero", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});
export type SelectGenero = typeof Genero.$inferSelect;
export type InsertGenero = typeof Genero.$inferInsert;

export const SubGenero = sqliteTable("SubGenero", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
	idGenero: integer("idGenero")
		.references(() => Genero.id, { onDelete: "cascade" })
		.notNull(),
});
export type SelectSubGenero = typeof SubGenero.$inferSelect;
export type InsertSubGenero = typeof SubGenero.$inferInsert;

export const Coleccion = sqliteTable("Coleccion", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});
export type SelectColeccion = typeof Coleccion.$inferSelect;
export type InsertColeccion = typeof Coleccion.$inferInsert;

export const Estado = sqliteTable("Estado", {
	id: integer().primaryKey({ autoIncrement: true }),
	nombre: text("nombre").notNull().unique(),
});
export type SelectEstado = typeof Estado.$inferSelect;
export type InsertEstado = typeof Estado.$inferInsert;

// ============================
// Entidades
// ============================
export const Editorial = sqliteTable("Editorial", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull(),
});

export type SelectEditorial = typeof Editorial.$inferSelect;
export type InsertEditorial = typeof Editorial.$inferInsert;

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
	idColeccion: integer("idColeccion").references(() => Coleccion.id, { onDelete: "restrict" }),
	coverImgPath: text("coverImgPath"),
	anyoEscritura: integer("anyoEscritura"),
	anyoEdicion: integer("anyoEdicion"),
	createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
	updatedAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type SelectLibro = typeof Libro.$inferSelect;
export type InsertLibro = typeof Libro.$inferInsert;

export const Contacto = sqliteTable("Contacto", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull().unique(),
	metodoContacto: text("metodo_contacto").notNull().unique(),
});

export type SelectContacto = typeof Contacto.$inferSelect;
export type InsertContacto = typeof Contacto.$inferInsert;

export const Autor = sqliteTable("Autor", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull(),
	apellidos: text("apellidos"),
});

export type SelectAutor = typeof Autor.$inferSelect;
export type InsertAutor = typeof Autor.$inferInsert;

export const Usuario = sqliteTable("Usuario", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	nombre: text("nombre").notNull().unique(),
	password: text("password").notNull(),
});

export type SelectUsuario = typeof Usuario.$inferSelect;
export type InsertUsuario = typeof Usuario.$inferInsert;

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

export type SelectNota = typeof Nota.$inferSelect;
export type InsertNota = typeof Nota.$inferInsert;

// ===============================
// Tablas intermedias
// ===============================

export const LibroContacto = sqliteTable(
	"LibroContacto",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		idLibro: text("idLibro")
			.references(() => Libro.id, { onDelete: "cascade" })
			.notNull(),
		idContacto: text("idContacto").references(() => Contacto.id),
		idPropietario: text("idPropietario").references(() => Contacto.id),
		isDevuelto: integer({ mode: "boolean" }).notNull().default(false),
		createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
		updatedAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
	},
	(table) => ({
		// Limitación de contacto (prestamos) o propietario (nos prestan)
		contactoOrPropietario: check(
			"contacto_or_propietario_check",
			sql`(${table.idContacto} is not null and ${table.idPropietario} is null) or (${table.idContacto} is null and ${table.idPropietario} is not null)`,
		),
	}),
);

export type SelectLibroContacto = typeof LibroContacto.$inferSelect;
export type InsertLibroContacto = typeof LibroContacto.$inferInsert;

export const LibroAutor = sqliteTable("LibroAutor", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	idLibro: text("idLibro")
		.references(() => Libro.id)
		.notNull(),
	idAutor: text("idAutor")
		.references(() => Autor.id)
		.notNull(),
});

export type SelectLibroAutor = typeof LibroAutor.$inferSelect;
export type InsertLibroAutor = typeof LibroAutor.$inferInsert;

export const LibroUsuario = sqliteTable(
	"LibroUsuario",
	{
		id: text("id")
			.primaryKey()
			.$defaultFn(() => crypto.randomUUID()),
		idLibro: text("idLibro")
			.references(() => Libro.id)
			.notNull(),
		idUsuario: text("idUsuario")
			.references(() => Usuario.id)
			.notNull(),
		idEstado: integer("idEstado")
			.references(() => Estado.id)
			.notNull(),
		valoracion: integer("valoracion"),
	},
	(table) => ({
		rangoValoracion: check("rango_valoracion_check", sql`${table.valoracion} >= 0 and ${table.valoracion} <= 10`),
	}),
);

export type SelectLibroUsuario = typeof LibroUsuario.$inferSelect;
export type InsertLibroUsuario = typeof LibroUsuario.$inferInsert;

// ===============================
// Tablas históricos
// ===============================

export const LibroUsuarioEstadoHistorico = sqliteTable("LibroUsuarioEstadoHistorico", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	idLibro: text("idLibro")
		.references(() => Libro.id)
		.notNull(),
	idUsuario: text("idUsuario")
		.references(() => Usuario.id)
		.notNull(),
	idEstado: integer("idEstado")
		.references(() => Estado.id)
		.notNull(),
	createdAt: integer({ mode: "timestamp" }).$defaultFn(() => new Date()),
});

export type SelectLibroUsuarioEstadoHistorico = typeof LibroUsuarioEstadoHistorico.$inferSelect;
export type InsertLibroUsuarioEstadoHistorico = typeof LibroUsuarioEstadoHistorico.$inferInsert;
