CREATE TABLE `Autor` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`apellidos` text
);
--> statement-breakpoint
CREATE TABLE `Coleccion` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Coleccion_nombre_unique` ON `Coleccion` (`nombre`);--> statement-breakpoint
CREATE TABLE `Contacto` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`metodo_contacto` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Contacto_nombre_unique` ON `Contacto` (`nombre`);--> statement-breakpoint
CREATE UNIQUE INDEX `Contacto_metodo_contacto_unique` ON `Contacto` (`metodo_contacto`);--> statement-breakpoint
CREATE TABLE `Editorial` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Estado` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Estado_nombre_unique` ON `Estado` (`nombre`);--> statement-breakpoint
CREATE TABLE `Genero` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Genero_nombre_unique` ON `Genero` (`nombre`);--> statement-breakpoint
CREATE TABLE `Libro` (
	`id` text PRIMARY KEY NOT NULL,
	`titulo` text NOT NULL,
	`idGenero` integer NOT NULL,
	`idSubgenero` integer,
	`idEditorial` text,
	`isbn` text NOT NULL,
	`idColeccion` integer,
	`coverImgPath` text,
	`anyoEscritura` integer,
	`anyoEdicion` integer,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`idGenero`) REFERENCES `Genero`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`idSubgenero`) REFERENCES `SubGenero`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`idEditorial`) REFERENCES `Editorial`(`id`) ON UPDATE no action ON DELETE restrict,
	FOREIGN KEY (`idColeccion`) REFERENCES `Coleccion`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Libro_isbn_unique` ON `Libro` (`isbn`);--> statement-breakpoint
CREATE TABLE `LibroAutor` (
	`id` text PRIMARY KEY NOT NULL,
	`idLibro` text NOT NULL,
	`idAutor` text NOT NULL,
	FOREIGN KEY (`idLibro`) REFERENCES `Libro`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idAutor`) REFERENCES `Autor`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `LibroContacto` (
	`id` text PRIMARY KEY NOT NULL,
	`idLibro` text NOT NULL,
	`idContacto` text,
	`idPropietario` text,
	`isDevuelto` integer DEFAULT false NOT NULL,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`idLibro`) REFERENCES `Libro`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`idContacto`) REFERENCES `Contacto`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idPropietario`) REFERENCES `Contacto`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "contacto_or_propietario_check" CHECK(("LibroContacto"."idContacto" is not null and "LibroContacto"."idPropietario" is null) or ("LibroContacto"."idContacto" is null and "LibroContacto"."idPropietario" is not null))
);
--> statement-breakpoint
CREATE TABLE `LibroUsuario` (
	`id` text PRIMARY KEY NOT NULL,
	`idLibro` text NOT NULL,
	`idUsuario` text NOT NULL,
	`idEstado` integer NOT NULL,
	`valoracion` integer,
	FOREIGN KEY (`idLibro`) REFERENCES `Libro`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idEstado`) REFERENCES `Estado`(`id`) ON UPDATE no action ON DELETE no action,
	CONSTRAINT "rango_valoracion_check" CHECK("LibroUsuario"."valoracion" >= 0 and "LibroUsuario"."valoracion" <= 10)
);
--> statement-breakpoint
CREATE TABLE `LibroUsuarioEstadoHistorico` (
	`id` text PRIMARY KEY NOT NULL,
	`idLibro` text NOT NULL,
	`idUsuario` text NOT NULL,
	`idEstado` integer NOT NULL,
	`createdAt` integer,
	FOREIGN KEY (`idLibro`) REFERENCES `Libro`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idEstado`) REFERENCES `Estado`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `Nota` (
	`id` text PRIMARY KEY NOT NULL,
	`idUsuario` text NOT NULL,
	`idLibro` text NOT NULL,
	`pagina` integer,
	`texto` text,
	`createdAt` integer,
	`updatedAt` integer,
	FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`idLibro`) REFERENCES `Libro`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `SubGenero` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `SubGenero_nombre_unique` ON `SubGenero` (`nombre`);--> statement-breakpoint
CREATE TABLE `Usuario` (
	`id` text PRIMARY KEY NOT NULL,
	`nombre` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Usuario_nombre_unique` ON `Usuario` (`nombre`);