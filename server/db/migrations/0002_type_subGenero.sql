PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_SubGenero` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nombre` text NOT NULL,
	`idGenero` integer NOT NULL,
	FOREIGN KEY (`idGenero`) REFERENCES `Genero`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_SubGenero`("id", "nombre", "idGenero") SELECT "id", "nombre", "idGenero" FROM `SubGenero`;--> statement-breakpoint
DROP TABLE `SubGenero`;--> statement-breakpoint
ALTER TABLE `__new_SubGenero` RENAME TO `SubGenero`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `SubGenero_nombre_unique` ON `SubGenero` (`nombre`);