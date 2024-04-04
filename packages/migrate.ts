/* eslint-disable no-useless-escape */
export const migrate = {
  createTable: async (sql: string, table?: string) => {
    return [await regx.dropIndex(sql, table), await regx.dropTable(sql, table), await regx.createTable(sql, table)];
  },
  dropTable: async (sql:string, table?: string) => {
    return [await regx.dropIndex(sql, table), await regx.dropTable(sql, table)];
  },
  showSql: async (sql:string) => {
    return sql;
  }
};

export const regx = {
  dropTable: async (sql: string, table?: string) => {
    const regex = table ?
      new RegExp(`CREATE TABLE (?:IF NOT EXISTS)? *["']?(${table})["' +]`, 'gmi') :
      new RegExp(`CREATE TABLE (?:IF NOT EXISTS)? *["']?([a-zA-Z0-9\$_ ]+?)["' ]`, 'gi');
    return [...sql.matchAll(regex)].map((value) => `DROP TABLE IF EXISTS "${value[1]}";`);
  },
  dropIndex: async (sql: string, table?: string) => {
    const regex = table ?
      new RegExp(`CREATE.*?INDEX (?:IF NOT EXISTS)? *["']?([a-zA-Z0-9\$_ ]+?)["' ] ON ["']?${table}["' +]`, 'gmi') :
      new RegExp(`CREATE.*?INDEX (?:IF NOT EXISTS)? *["']?([a-zA-Z0-9\$_ ]+?)["' ]`, 'gi');
    return [...sql.matchAll(regex)].map((value) => `DROP INDEX IF EXISTS "${value[1]}";`);
  },
  createTable: async (sql: string, table?: string) => {
    const regex = table ?
      new RegExp(`CREATE TABLE.*?${table}(?:\\s|\\n|\\r|.)*?;`, 'gmi') :
      new RegExp(`CREATE TABLE.*?(?:\\s|\\n|\\r|.)*?;`, 'gmi');
    return sql.match(regex) || [];
  },
  createIndex: async (sql: string, table?: string) => {
    const regex = table ?
      new RegExp(`CREATE.*?INDEX.*?ON.*?${table}(?:\\s|\\n|\\r|.)*?;`, 'gmi') :
      new RegExp(`CREATE.*?INDEX.*?ON.*?(?:\\s|\\n|\\r|.)*?;`, 'gmi');
    return sql.match(regex) || [];
  },
};
