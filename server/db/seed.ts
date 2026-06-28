// Seed inicial de datos para desarrollo de pruebas
import { db } from "../utils/db.ts";
import { reset } from "drizzle-seed";
import { sql } from "drizzle-orm";
import * as schema from "./schema.ts";

// Reset de la base de datos previa al seed inicial
await reset(db as any, schema as any);
await db.run(sql`DELETE FROM sqlite_sequence;`);

// ===============================
// Tablas maestras
// ===============================

//  Géneros
const generos: schema.InsertGenero[] = [
	{ nombre: "Narrativo" },
	{ nombre: "Lírico" },
	{ nombre: "Dramático" },
	{ nombre: "Didáctico" },
];

const generosInsertados: schema.SelectGenero[] = await db
	.insert(schema.Genero)
	.values(generos)
	.returning({ id: schema.Genero.id, nombre: schema.Genero.nombre });

// Recuperamos ids para asignar a subgéneros
const idNarrativo = generosInsertados.find((g) => g.nombre === "Narrativo")!.id;
const idLirico = generosInsertados.find((g) => g.nombre === "Lírico")!.id;
const idDramatico = generosInsertados.find((g) => g.nombre === "Dramático")!.id;
const idDidactico = generosInsertados.find((g) => g.nombre === "Didáctico")!.id;

// Subgéneros
const subGeneros: schema.InsertSubGenero[] = [
	{ nombre: "Novela Histórica", idGenero: idNarrativo },
	{ nombre: "Novela Negra", idGenero: idNarrativo },
	{ nombre: "Novela Romántica", idGenero: idNarrativo },
	{ nombre: "Novela Ciencia Ficción", idGenero: idNarrativo },
	{ nombre: "Novela Fantástica", idGenero: idNarrativo },
	{ nombre: "Novela Terror", idGenero: idNarrativo },
	{ nombre: "Cuento", idGenero: idNarrativo },
	{ nombre: "Epopeya", idGenero: idNarrativo },
	{ nombre: "Mito / Leyenda", idGenero: idNarrativo },
	{ nombre: "Oda", idGenero: idLirico },
	{ nombre: "Elegía", idGenero: idLirico },
	{ nombre: "Égloga", idGenero: idLirico },
	{ nombre: "Sátira", idGenero: idLirico },
	{ nombre: "Himno", idGenero: idLirico },
	{ nombre: "Soneto", idGenero: idLirico },
	{ nombre: "Tragedia", idGenero: idDramatico },
	{ nombre: "Comedia", idGenero: idDramatico },
	{ nombre: "Drama", idGenero: idDramatico },
	{ nombre: "Ensayo", idGenero: idDidactico },
	{ nombre: "Fábula", idGenero: idDidactico },
	{ nombre: "Epístola", idGenero: idDidactico },
	{ nombre: "Diálogo", idGenero: idDidactico },
	{ nombre: "Aforismo", idGenero: idDidactico },
];

// Insertamos sin returning
await db.insert(schema.SubGenero).values(subGeneros);

// Estados
const estados: schema.InsertEstado[] = [
	{ nombre: "Comprar" },
	{ nombre: "Pendiente" },
	{ nombre: "Leyendo" },
	{ nombre: "Pausado" },
	{ nombre: "Leído" },
];

await db.insert(schema.Estado).values(estados);
