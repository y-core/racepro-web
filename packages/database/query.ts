// https://github.com/leemason/querybuilder
// https://github.com/himorishige/qwik-drizzle-d1-starter
interface QueryObject {
  ACTION: "select" | "insert" | "delete" | "update";
  COLUMNS: string[] | string;
  TABLE: string;
  WHERE: string;
  GROUPBY: string[];
  ORDERBY: string[];
  MODIFIER: "" | "DISTINCT " | `TOP ${number} `;
}

export interface Query {
  q: QueryObject;
  init(): void;
  select(columns?: string[]): Query;
  delete(columns?: string[]): Query;
  insert(columns?: string[]): Query;
  update(columns?: string[]): Query;
  from(table: string): Query;
  into(table: string): Query;
  where(columns?: string[]): Query;
  orWhere(columns?: string[]): Query;
  order(columns?: string[]): Query;
  distinct(): Query;
  top(number: number): Query;
  render(): string;
}

type Compile = {
  [action in QueryObject["ACTION"]]: (q: QueryObject) => string;
};

const initialize = (): QueryObject => ({
  ACTION: "select",
  COLUMNS: ["*"],
  TABLE: "",
  WHERE: "",
  GROUPBY: [],
  ORDERBY: [],
  MODIFIER: "",
});

const query: Query = {
  q: initialize(),
  init() {
    this.q = initialize();
  },
  // ACTION & COLUMNS
  select(columns) {
    this.init();
    this.q.COLUMNS = !columns || columns.length < 1 ? ["*"] : columns;
    this.q.ACTION = "select";
    return this;
  },
  delete(columns) {
    this.init();
    this.q.COLUMNS = columns || [];
    this.q.ACTION = "delete";
    return this;
  },
  insert(columns) {
    this.init();
    this.q.COLUMNS = columns || [];
    this.q.ACTION = "insert";
    return this;
  },
  update(columns) {
    this.init();
    this.q.COLUMNS = columns ? `${columns[0]}="${columns[1]}"` : [];
    this.q.ACTION = "update";
    return this;
  },
  // TABLE
  from(table) {
    this.q.TABLE = table;
    return this;
  },
  into(table) {
    this.from(table);
    return this;
  },
  // WHERE
  where(columns) {
    let cols = [];
    if (columns?.length === 3) {
      cols = columns;
    } else {
      cols = [columns[0], "=", columns[1]];
    }
    this.q.WHERE = this.q.WHERE.length > 0 ? ` ${this.q.WHERE} AND ${cols[0]} ${cols[1]} ${cols[2]}` : ` ${this.q.WHERE} WHERE ${cols[0]} ${cols[1]} ${cols[2]}`;
    return this;
  },
  orWhere(columns) {
    let cols = [];
    if (columns?.length === 3) {
      cols = columns;
    } else {
      cols = [columns[0], "=", columns[1]];
    }
    this.q.WHERE = this.q.WHERE.length > 0 ? ` ${this.q.WHERE} OR ${cols[0]} ${cols[1]} ${cols[2]}` : ` ${this.q.WHERE} WHERE ${cols[0]} ${cols[1]} ${cols[2]}`;
    return this;
  },
  // ORDERBY
  order(columns) {
    this.q.COLUMNS = columns ? ` ORDER BY ${columns.toString()}` : [];
    return this;
  },
  // MOFIFIER
  distinct() {
    this.q.MODIFIER = "DISTINCT ";
    return this;
  },
  top(number) {
    this.q.MODIFIER = `TOP ${number} `;
    return this;
  },
  // RENDER
  render() {
    const res = compile[`${this.q.ACTION}`](this.q);
    return res;
  },
};

const compile: Compile = {
  select: (q: QueryObject) => {
    return `SELECT ${q.MODIFIER}${q.COLUMNS.toString()} FROM ${q.TABLE}${q.WHERE}${q.ORDERBY};`;
  },
  insert: (q: QueryObject) => {
    const values = "?,".repeat(q.COLUMNS.length).slice(0, -1);

    return `INSERT INTO ${q.TABLE} (${q.COLUMNS.toString()}) VALUES (${values});`;
  },
  delete: (q: QueryObject) => {
    // Implementation for delete query
    return `DELETE ${q.COLUMNS.toString()} FROM ${q.TABLE}${q.WHERE};`;
  },
  update: (q: QueryObject) => {
    // Implementation for update query
    return `UPDATE ${q.TABLE} SET ${q.COLUMNS.toString()} ${q.WHERE};`;
  },
};

export default query;

//
// CREATE DATABASE  CREATE DATABASE database_name
// CREATE TABLE     CREATE TABLE table_name ( column_name1 data_type, column_name2 data_type, column_name3 data_type, ... )
// CREATE INDEX     CREATE INDEX index_name ON table_name (column_name) | CREATE UNIQUE INDEX index_name ON table_name (column_name)
// CREATE VIEW      CREATE VIEW view_name AS SELECT column_name(s) FROM table_name WHERE condition
// ALTER TABLE      ALTER TABLE table_name  ADD column_name datatype | ALTER TABLE table_name  DROP COLUMN column_name

// DROP DATABASE    DROP DATABASE database_name </tr> <tr>
// DROP INDEX       DROP INDEX table_name.index_name (SQL Server) DROP INDEX index_name ON table_name (MS Access) DROP INDEX index_name (DB2/Oracle) ALTER TABLE table_name DROP INDEX index_name (MySQL)
// DROP TABLE       DROP TABLE table_name </tr> <tr>
// TRUNCATE TABLE   TRUNCATE TABLE table_name

// INSERT INTO      INSERT INTO table_name (column1, column2, column3,...) VALUES (value1, value2, value3,....) | INSERT INTO table_name VALUES (value1, value2, value3,....)
// DELETE           DELETE FROM table_name WHERE some_column=some_value | DELETE [*] FROM table_name
// UPDATE           UPDATE table_name SET column1=value, column2=value,... WHERE some_column=some_value

// SELECT           SELECT column_name(s) FROM table_name
// SELECT *         SELECT * FROM table_name
// SELECT DISTINCT  SELECT DISTINCT column_name(s) FROM table_name
// SELECT INTO      SELECT * INTO new_table_name [IN externaldatabase] FROM old_table_name | SELECT column_name(s) INTO new_table_name [IN externaldatabase] FROM old_table_name
// SELECT TOP       SELECT TOP number|percent column_name(s) FROM table_name

// WHERE            SELECT column_name(s) FROM table_name WHERE column_name operator value
// BETWEEN          SELECT column_name(s) FROM table_name WHERE column_name BETWEEN value1 AND value2
// HAVING           SELECT column_name, aggregate_function(column_name) FROM table_name WHERE column_name operator value GROUP BY column_name HAVING aggregate_function(column_name) operator value
// IN               SELECT column_name(s) FROM table_name WHERE column_name IN (value1,value2,..)
// LIKE             SELECT column_name(s) FROM table_name WHERE column_name LIKE pattern
// AND / OR         SELECT column_name(s) FROM table_name WHERE condition AND|OR condition

// GROUP BY         SELECT column_name, aggregate_function(column_name) FROM table_name WHERE column_name operator value GROUP BY column_name
// ORDER BY         SELECT column_name(s) FROM table_name ORDER BY column_name [ASC|DESC]

// INNER JOIN       SELECT column_name(s) FROM table_name1 INNER JOIN table_name2  ON table_name1.column_name=table_name2.column_name
// LEFT JOIN        SELECT column_name(s) FROM table_name1 LEFT JOIN table_name2  ON table_name1.column_name=table_name2.column_name
// RIGHT JOIN       SELECT column_name(s) FROM table_name1 RIGHT JOIN table_name2  ON table_name1.column_name=table_name2.column_name
// FULL JOIN        SELECT column_name(s) FROM table_name1 FULL JOIN table_name2  ON table_name1.column_name=table_name2.column_name

// UNION            SELECT column_name(s) FROM table_name1 UNION SELECT column_name(s) FROM table_name2
// UNION ALL        SELECT column_name(s) FROM table_name1 UNION ALL SELECT column_name(s) FROM table_name2
// AS (alias)       SELECT column_name AS column_alias FROM table_name | SELECT column_name FROM table_name AS table_alias
// EXISTS           IF EXISTS (SELECT * FROM table_name WHERE id = ?)BEGIN--do what needs to be done if existsENDELSEBEGIN--do what needs to be done if notEND

//
//
// var sql = Manager.connection()
//   .table("users")
//   .select("first_name", "email")
//   .where("first_name", "Lee")
//   .where("last_name", "!=", "Mason")
//   .andWhere(function (q) {
//     q.where("admin", true);
//     q.where("active", false);
//   })
//   .orWhere(function (q) {
//     q.where("active", true);
//     q.where("admin", false);
//   })
//   .whereBetween("balance", [10, 100])
//   .whereNotBetween("balance", [80, 90])
//   .whereIn("balance", [10, 100])
//   .whereNotIn("balance", [80, 90])
//   .whereNull("nullable")
//   .whereNotNull("nullable")
//   .whereExists(function (q) {
//     q.select(1).from("orders").whereRaw("orders.user_id = users.id");
//   })
//   .orderBy("first_name", "asc")
//   .orderBy("email", "desc")
//   .skip(5)
//   .take(10);

//
//
// export const query = () => {
//// this.q = {
////   TABLE: "",
////   COLUMNS: [],
////   VALUES: [],
////   WHERE: [],
////   GROUPBY: [],
////   ORDERBY: [],
//// }
//// select: (columns: string[]) => {},
//// insert: (columns: string[]) => {},
//// delete,
//   update: (columns: string[]) => {},
////   from: (table: string) => {},
////   into: (table: string) => {},
//   where: (...conditions: [string, any, string?][]) => {
//     conditions.map((condition) => {
//       if (!condition[2]) condition.push("=");
//     });
//   },
//   orWhere: (...conditions: [string, any, string?][]) => {},
//   //whereBetween, whereNotBetween, whereIn, whereNotIn, whereNull, whereNotNull, whereExists,
//   // join, innerJoin, leftJoin, leftOuterJoin, rightJoin, rightOuterJoin, outerJoin, fullOuterJoin, crossJoin
//   // having, union
//   // orderBy, groupBy, limit
//   // delete, truncate,
//   // count
//   // all, first, run
// };
