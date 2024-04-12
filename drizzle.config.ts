export default {
  schema: "./src/server/schema/20240404.sql.ts",
  out: "src/server/schema/migrations",
  driver: "d1",
  dbCredentials: {
    wranglerConfigPath: "wrangler.toml",
    dbName: "racepro",
  },
};
