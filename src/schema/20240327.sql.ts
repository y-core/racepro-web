import { type SqlLite } from "^/database/builder";

export const logs: SqlLite = {
  table: "logs",
  columns: [
    { name: "id", type: "INTEGER", index: "PRIMARY KEY", ai: true },
    { name: "type", type: "TEXT", notNull: true, default: "log" },
    { name: "created_at", type: "INTEGER", default: "CURRENT_TIMESTAMP" },
    { name: "description", type: "TEXT", notNull: true },
  ],
  indexes: [
    { name: "logs_type_idx", columns: [{ name: "type" }] },
    { name: "logs_type_date_idx", columns: [{ name: "type" }, { name: "created_at" }] },
  ],
};
