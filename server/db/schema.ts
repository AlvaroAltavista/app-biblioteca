import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

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
	id: integer().primaryKey({ autoIncrement: true }),
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
	idColeccion: integer("idColeccion").references(() => Coleccion.id, { onDelete: "restrict" }),
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

// ===============================
// Tablas historicos
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
