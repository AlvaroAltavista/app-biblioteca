import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "../db/schema";

// Inicialización del driver de conexión física de better-sqlite3
const sqlite = new Database("./server/db/biblioteca.db");

// Instanciamos pasando la conexión y el schema
export const db = drizzle(sqlite, { schema });
