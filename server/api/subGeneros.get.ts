import { db } from "#server/utils/db";
import { SubGenero } from "#server/db/schema";

export default defineEventHandler(async () => db.select().from(SubGenero));
