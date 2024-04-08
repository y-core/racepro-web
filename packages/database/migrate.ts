import { type SqlLite, builder } from "^/database/builder";
import q from "^/database/query";

interface Model {
  seed<T = unknown>(db: D1Database, table: string, column: string[], data: string[][]): Promise<D1Result<T>[] | null>;
  migrate(db: D1Database, table: SqlLite): Promise<D1Result<unknown>[] | null>;
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
  migrate: async (db, table) => {
    const statements = await Promise.all([await builder.dropIndex(table), await builder.dropTable(table), await builder.createTable(table)]);
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
