import { type SqlLite, builder } from "^/database/builder";

type Log = {
  type: string;
  description: string;
};

export const model = {
  findAll: async (db: D1Database, table: string) => {
    const query = `SELECT ${table}.* FROM ${table} ORDER BY ${table}.created_at DESC;`;
    return await db.prepare(query).all();
  },
  findByType: async (db: D1Database, table: string, type: string) => {
    const query = `SELECT ${table}.* FROM ${table} WHERE ${table}.type = ?;`;
    return await db.prepare(query).bind(type).all();
  },
  findById: async (db: D1Database, table: string, id: number) => {
    const query = `SELECT ${table}.* FROM ${table} WHERE ${table}.id = ?;`;
    return await db.prepare(query).bind(id).first();
  },
  create: async (db: D1Database, table: string, log: Log) => {
    const query = `INSERT INTO ${table} (type, description) VALUES (?, ?);`;
    return await db.prepare(query).bind(log.type, log.description).run();
  },
  migrate: async (db: D1Database, table: SqlLite) => {
    const statements = await Promise.all([await builder.dropIndex(table), await builder.dropTable(table), await builder.createTable(table)]);
    const migrations = statements.flatMap((groups) => groups?.map((statement) => `${statement}`));
    try {
      return await db.batch(migrations.map((line) => db.prepare(`${line}`)));
    } catch (e: any) {
      console.error({ message: e.message });
    }
  },
};
