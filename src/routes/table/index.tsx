import { Resource, component$, useResource$, useStore, useTask$ } from "@builder.io/qwik";
import { type DocumentHead, server$ } from "@builder.io/qwik-city";

import q from "^/database/query";
import m from "^/database/migrate";
import { buildSqlite } from "^/database/buildSqlite";

import { isDev } from "@builder.io/qwik/build";

const migration = {
  schemas: import.meta.glob("/src/server/schema/*", { eager: isDev ? false : true }),
  schema: `/src/server/schema/20240327.sql.ts`,
  data: `/src/server/schema/20240327.data.ts`,
};

const getPragma = server$(async function () {
  const db = this.platform.env["MAIN_DATA"];
  try {
    const res = await db.prepare("PRAGMA table_info(event)").all();
    return res.results.map((row) => row.name);
  } catch (e: any) {
    console.error({ message: e.message });
    return [];
  }
});

const getData = server$(async function () {
  const db = this.platform.env["MAIN_DATA"];
  try {
    const res = await db.prepare(q.select().from("event").render()).all();
    return res.results;
  } catch (e: any) {
    console.error({ message: e.message });
    return [];
  }
});

// const migrateSchema = server$(async function (schema) {
const migrateSchema = server$(async function () {
  const db = this.platform.env.MAIN_DATA;
  const tables = await buildSqlite.serializeSQLite("/src/server/schema/20240404.sql.ts");
  return await m.migrate(db, tables);
});
const seedData = server$(async function (schema) {
  const db = this.platform.env.MAIN_DATA;
  return await m.seed(db, schema.table, schema.columns, schema.data);
});

export default component$(() => {
  const tableInfo = getPragma();
  const data = useResource$(async () => {
    return getData();
  });
  const s = useStore({ schema: "", data: "" });

  useTask$(async () => {
    s.schema = isDev ? await migration.schemas[migration.schema]() : migration.schemas[migration.schema];
    s.data = isDev ? await migration.schemas[migration.data]() : migration.schemas[migration.data];
  });

  return (
    <div class="container mx-auto">
      <div class="flex justify-between p-4">
        <div>
          <h1 class="text-2xl">Tables</h1>
        </div>
        <div>
          <input id="search" type="text" class="w-full rounded p-2" placeholder="Search..." onInput$={(e) => (search.term.value = (e.target as HTMLInputElement).value)} />
        </div>
      </div>

      <div class="mb-2 flex flex-row gap-x-2">
        <button
          class="h-12 w-28 rounded-md bg-sky-600 text-slate-200 ring-1 ring-inset hover:bg-sky-700 "
          onClick$={async () => {
            // const res = await migrateSchema(s.schema.todos);
            console.log("Migrating");
            const res = await migrateSchema();
            console.log(res);
          }}
        >
          Migrate Table
        </button>
        <button
          class="h-12 w-28 rounded-md bg-sky-600 text-slate-200 ring-1 ring-inset hover:bg-sky-700 "
          onClick$={async () => {
            console.log(s.data.event);
            console.log("Seeding");
            const res = await seedData(s.data.event);
            // const res = await seedData();
            console.log(res);
          }}
        >
          Seed data
        </button>
      </div>

      <Resource
        value={data}
        onPending={() => <p>Loading ...</p>}
        onResolved={(rows) => (
          <>
            <table class="border border-slate-300">
              <tbody>
                {rows.map(async (row) => (
                  <tr key={row.id} class="border border-slate-300">
                    {(await tableInfo).map((field) => (
                      <td key={row.id}>{row[`${field}`]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Entry",
  meta: [
    {
      name: "description",
      content: "Event",
    },
  ],
};
