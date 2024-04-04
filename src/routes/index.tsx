import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { server$, type DocumentHead } from "@builder.io/qwik-city";
import { authManager } from "~/server/auth/authManager";
import { model } from "^/model";
import { type SqlLite, builder } from "^/database/builder";

import { isDev } from "@builder.io/qwik/build";
const migrations = import.meta.glob("/src/schema/*", { eager: isDev ? false : true });
const migration = "20240327.sql";

const serverAuth = authManager.serverAuth;

const migrateLogs = server$(async function (logs) {
  return await model.migrate(this.platform.env["LOG_DATA"], logs);
});
const createLog = server$(async function (log) {
  return await model.create(this.platform.env["LOG_DATA"], "logs", log);
});
const showLogs = server$(async function () {
  return await model.findAll(this.platform.env["LOG_DATA"], "logs");
});
const createTable = server$(async function (logs) {
  console.log(await builder.createTable(logs));
  console.log(await builder.dropTable(logs));
  console.log(await builder.createIndex(logs));
  console.log(await builder.dropIndex(logs));
  console.log(await builder.dropIndex(logs, ["logs_type_idx"]));
});

export default component$(() => {
  const email = useSignal("office@strengths.institute");
  // const table = useSignal<Record<string, SqlLite>>();
  const table = useSignal<SqlLite>();

  const migrationName = `/src/schema/${migration}.ts`;
  useTask$(async () => {
    table.value = isDev ? await migrations[migrationName]() : migrations[migrationName];
  });

  return (
    <>
      <div class="mx-40 mt-64 flex flex-col items-center justify-center gap-y-2 border border-cyan-500">
        <label for="email">E-mail</label>
        <input bind:value={email} name="email" class="rounded-md px-3 py-3 ring-1 ring-inset ring-sky-500 focus:ring-2 focus:ring-inset focus:ring-sky-500" />

        <button
          class="h-12 w-28 rounded-md bg-sky-600 text-slate-200 ring-1 ring-inset hover:bg-sky-700 "
          onClick$={async () => {
            console.log("Request", email.value);
            const auth = await serverAuth(email.value);
            email.value = auth.otp;
          }}
        >
          Request Token
        </button>

        <div class="flex flex-row gap-2">
          <button
            class="h-12 w-28 rounded-md bg-sky-600 text-slate-200 ring-1 ring-inset hover:bg-sky-700 "
            onClick$={async () => {
              await createTable(table.value.logs);
            }}
          >
            Test Builder
          </button>

          <button
            class="h-12 w-28 rounded-md bg-sky-600 text-slate-200 ring-1 ring-inset hover:bg-sky-700 "
            onClick$={async () => {
              await createLog({ type: "msg", description: "test log" });
            }}
          >
            Create Log
          </button>
          <button
            class="h-12 w-28 rounded-md bg-sky-600 text-slate-200 ring-1 ring-inset hover:bg-sky-700 "
            onClick$={async () => {
              const res = await showLogs();
              console.log(res);
            }}
          >
            Show Logs
          </button>
          <button
            class="h-12 w-28 rounded-md bg-sky-600 text-slate-200 ring-1 ring-inset hover:bg-sky-700 "
            onClick$={async () => {
              const res = await migrateLogs(table.value.logs);
              console.log(res);
            }}
          >
            Create Table
          </button>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
