import { getTableName, is, SQL } from "drizzle-orm";
import { getTableConfig, SQLiteBaseInteger, SQLiteTable } from "drizzle-orm/sqlite-core";

interface IndexObject {
  table: string;
  name: string;
  columns: string[];
  unique: boolean;
  where?: SQL<unknown>;
}

export const buildSqlite = {
  serializeSQLite: async (path: string) => {
    const schema = await import(path);
    const tableDefinitions = Object.values(schema);
    const tables = tableDefinitions.filter((tableDefinition) => is(tableDefinition, SQLiteTable)).map((tableDefinition) => tableDefinition);

    return tables;
  },
  createTable: async (tables: SQLiteTable[]) => {
    const tableList = tables.flatMap((table) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name: tableName, columns, indexes, foreignKeys: tableForeignKeys, primaryKeys, uniqueConstraints } = getTableConfig(table);
      const tableObj = {
        tableName: tableName,
        schema: "",
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, no-constant-condition
        exists: true ? "" : "IF NOT EXISTS ",
      };
      const indexObj: IndexObject[] = [];

      const columnItems = columns.map((column) => {
        const columnObj = {
          name: column.name,
          type: column.getSQLType(),
          notNull: column.notNull ? " NOT NULL" : "",
          primary: column.primary ? " PRIMARY KEY" : "",
          autoincrement: is(column, SQLiteBaseInteger) && column.autoIncrement ? " AUTOINCREMENT" : "",
          default: column.default ? (is(column.default, SQL) ? ` DEFAULT ${sqlToStr(column.default)}` : ` DEFAULT '${column.default}'`) : "",
        };

        if (column.isUnique && typeof column.uniqueName !== "undefined") {
          indexObj.push({
            table: tableName,
            name: column.uniqueName,
            columns: [column.name],
            unique: column.isUnique,
          });
        }

        return `\n  \`${columnObj.name}\` ${columnObj.type}${columnObj.primary}${columnObj.autoincrement}${columnObj.notNull}${columnObj.default}`;
      });

      indexes.map((value) => {
        indexObj.push({
          table: tableName,
          name: value.config.name,
          columns: value.config.columns.map((it) => it.name),
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          unique: value.config.unique ?? false,
          where: value.config.where,
        });
      });

      const foreignKeyItems = tableForeignKeys.map((key) => {
        const reference = key.reference();
        const fkObj = {
          name: key.getName(),
          tableFrom: tableName,
          onDelete: key.onDelete ? " ON DELETE no action" : "",
          onUpdate: key.onUpdate ? " ON UPDATE no action" : "",
          tableTo: getTableName(reference.foreignTable),
          columnsFrom: reference.columns
            .map((it) => it.name)
            .map((it) => `\`${it}\``)
            .join(","),
          columnsTo: reference.foreignColumns
            .map((it) => it.name)
            .map((it) => `\`${it}\``)
            .join(","),
        };
        return `\n  FOREIGN KEY (${fkObj.columnsFrom}) REFERENCES \`${fkObj.tableTo}\`(${fkObj.columnsTo})${fkObj.onUpdate}${fkObj.onDelete}`;
      });

      const uniqueItems = uniqueConstraints
        .filter((key) => typeof key.name !== "undefined")
        .map((key) => {
          const columns = key.columns
            .map((it) => it.name)
            .map((it) => `\`${it}\``)
            .join(",");

          indexObj.push({
            table: tableName,
            name: key.name ?? `${tableName}${String(Math.random)}`,
            columns: key.columns.map((it) => it.name),
            unique: true,
          });

          return `\n  CONSTRAINT ${key.name} UNIQUE(${columns})`;
        });

      const indexItems = indexObj.map((index) => {
        const indexPart = index.unique ? "UNIQUE INDEX" : "INDEX";
        const value = index.columns.map((it) => `\`${it}\``).join(",");
        const whereStatement = index.where ? ` WHERE ${index.where}` : "";

        return `CREATE ${indexPart} \`${index.name}\` ON \`${index.table}\` (${value})${whereStatement};`;
      });

      const tableItems = columnItems.concat(foreignKeyItems, uniqueItems);

      return [`CREATE TABLE ${tableObj.exists}${tableObj.schema}\`${tableObj.tableName}\` (${tableItems.toString()}\n);`].concat(indexItems);
    });

    console.log(tableList);
    return tableList;
  },
  dropTable: async (tables: SQLiteTable[]) => {
    return tables.map((table) => {
      const { name: tableName } = getTableConfig(table);
      return `DROP TABLE IF EXISTS \`${tableName}\`;`;
    });
  },
};

const sqlToStr = (sql: SQL<unknown>) => {
  return sql.toQuery({
    escapeName: () => {
      throw new Error("we don't support params for `sql` default values");
    },
    escapeParam: () => {
      throw new Error("we don't support params for `sql` default values");
    },
    escapeString: () => {
      throw new Error("we don't support params for `sql` default values");
    },
  }).sql;
};
