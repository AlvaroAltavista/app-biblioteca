import { db } from "#server/utils/db";
import { Genero } from "#server/db/schema";

export default defineEventHandler(async (event) => db.select().from(Genero));
