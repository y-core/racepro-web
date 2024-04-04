//www.sqlite.org/lang_createtable.html
//www.sqlite.org/syntax/column-constraint.html

export interface SqlLite {
  table: SqlName;
  schema?: SqlName;
  exists?: ExistsProps;
  columns: TableColumnProps[];
  indexes?: IndiciesProps[];
}
interface TableColumnProps {
  name: SqlName;
  type: ColumnType;
  index?: ColumnIndex;
  order?: ColumnIndexOrder;
  ai?: boolean;
  notNull?: boolean;
  default?: string;
}
interface IndiciesProps {
  name: SqlName;
  unique?: boolean;
  exists?: ExistsProps;
  columns: IndexColumnProps[];
}
interface IndexColumnProps {
  name: SqlName;
  order?: ColumnIndexOrder;
}
interface ExistsProps {
  create?: boolean;
  drop?: boolean;
}

type SqlName = string;
type ColumnType = "INT" | "INTEGER" | "REAL" | "TEXT" | "BLOB" | "ANY";
type ColumnIndex = "PRIMARY KEY" | "UNIQUE";
type ColumnIndexOrder = "ASC" | "DESC";

export const builder = {
  createTable: async (catalog: SqlLite) => {
    const schema = catalog.schema && catalog.schema !== "" ? `"${catalog.schema}".` : "";
    const exists = catalog.exists?.create ? "" : "IF NOT EXISTS ";
    const columns = tableColumns(catalog.columns);

    return [`CREATE TABLE ${exists}${schema}"${catalog.table}" (${columns}\n);`];
  },
  dropTable: async (catalog: SqlLite) => {
    const schema = catalog.schema && catalog.schema !== "" ? `"${catalog.schema}".` : "";
    const exists = catalog.exists?.drop === undefined || catalog.exists.drop === true ? "IF EXISTS " : "";

    return [`DROP TABLE ${exists}${schema}"${catalog.table}";`];
  },
  createIndex: async (catalog: SqlLite) => {
    const schema = catalog.schema && catalog.schema !== "" ? `"${catalog.schema}".` : "";

    return catalog.indexes?.map((ix) => {
      const exists = ix.exists?.create ? "" : " IF NOT EXISTS";
      const unique = ix.unique ? ` UNIQUE` : "";
      const columns = indexColumns(ix.columns);

      return `CREATE${unique} INDEX${exists} ${schema}"${ix.name}" ON "${catalog.table}" (${columns});`;
    });
  },
  dropIndex: async (catalog: SqlLite, indexes?: string[]) => {
    const schema = catalog.schema && catalog.schema !== "" ? `"${catalog.schema}".` : "";
    const exists = catalog.exists?.drop === undefined || catalog.exists.drop === true ? "IF EXISTS " : "";

    return (catalog.indexes ?? [])
      .filter((ix) => !indexes || indexes.includes(ix.name))
      .map((ix) => {
        return `DROP INDEX ${exists}${schema}"${ix.name}";`;
      });
  },
};

const tableColumns = (columns: TableColumnProps[]) => {
  return columns.map((column) => {
    const index = column.index ? ` ${column.index}` : "";
    const order = column.order ? ` ${column.order}` : "";
    const ai = column.ai ? ` AUTOINCREMENT` : "";
    const notNull = column.notNull ? ` NOT NULL` : "";
    const def = column.default ? ` DEFAULT ${column.default}` : "";

    return `\n\t"${column.name}" ${column.type}${index}${order}${ai}${notNull}${def}`;
  });
};

const indexColumns = (columns: IndexColumnProps[]) => {
  return columns.map((column) => {
    const order = column.order ? ` ${column.order}` : "";

    return `"${column.name}"${order}`;
  });
};
