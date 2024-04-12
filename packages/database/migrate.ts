import q from "^/database/query";
import { buildSqlite } from "^/database/buildSqlite";
import { type SQLiteTable, type TableConfig } from "drizzle-orm/sqlite-core";

interface Model {
  seed<T = unknown>(db: D1Database, table: string, column: string[], data: string[][]): Promise<D1Result<T>[] | null>;
  migrate(db: D1Database, tables: SQLiteTable<TableConfig>[]): Promise<D1Result<unknown>[] | null>;
}

const migrate: Model = {
  seed: async (db, table, column, data) => {
    try {
      return await db.batch(data.map((line) => db.prepare(q.insert(column).into(table).render()).bind(...line)));
    } catch (e: any) {
      console.error({ message: e.message });
      return null;
    }
  },
  migrate: async (db, tables) => {
    const statements = await Promise.all([await buildSqlite.dropTable(tables), await buildSqlite.createTable(tables)]);
    const migrations = statements.flatMap((groups) => groups.map((statement) => `${statement}`));
    try {
      return await db.batch(migrations.map((line) => db.prepare(`${line}`)));
    } catch (e: any) {
      console.error({ message: e.message });
      return null;
    }
  },
};

export default migrate;
