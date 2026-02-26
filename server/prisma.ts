import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNodeSQLite } from "prisma-adapter-node-sqlite";

const connectionString = process.env.DATABASE_URL || "file:./dev.db";
const dbPath = connectionString.replace("file:", "");

const adapter = new PrismaNodeSQLite({ url: dbPath });

const prisma = new PrismaClient({ adapter });

export { prisma };
export default prisma;