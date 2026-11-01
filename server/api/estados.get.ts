import { db } from "#server/utils/db";
import { Estado } from "#server/db/schema";

export default defineEventHandler(async (event) => db.select().from(Estado));
