import { Resource, component$, useResource$, useStore, useTask$ } from "@builder.io/qwik";
import { Link, type DocumentHead, server$ } from "@builder.io/qwik-city";

import q from "^/database/query";

export interface Event {
  id: number;
  event_name: string;
  event_address: string;
  event_image: string;
  event_details: string;
}

const getData = server$(async function (search?: string): Promise<Event[]> {
  const db = this.platform.env["MAIN_DATA"];
  const res = await db
    .prepare(
      q
        .select()
        .from("event")
        .where(["event_name", "LIKE", `"%${search}%"`])
        .orWhere(["event_address", "LIKE", `"%${search}%"`])
        .render(),
    )
    .all<Event>();
  return res.results;
});

export default component$(() => {
  const search = useStore({ term: "", debounce: "" });
  const data = useResource$(async ({ track }) => {
    track(() => search.debounce);
    return await getData(search.term);
  });

  useTask$(({ track, cleanup }) => {
    const value = track(() => search.term);
    const id = setTimeout(() => (search.debounce = value), 300);
    cleanup(() => clearTimeout(id));
  });

  return (
    <div class="container mx-auto">
      <div class="flex justify-between p-4">
        <div>
          <h1 class="text-2xl">Events</h1>
        </div>
        <div>
          <input id="search" type="text" class="w-full rounded p-2" placeholder="Search..." onInput$={(e) => (search.term = (e.target as HTMLInputElement).value)} />
        </div>
      </div>
      <Resource
        value={data}
        onPending={() => <p>Loading ...</p>}
        onResolved={(rows) => (
          <>
            <div class="grid grid-cols-3 gap-4">
              {rows &&
                rows.map((row) => (
                  <div key={row.id} class="rounded-lg border border-slate-200">
                    <div class="aspect-[4/3] rounded-lg bg-cover bg-center" style={`background-image:url('${row.event_image}')`}></div>
                    <div class="p-6">
                      <h3>{row.event_name}</h3>
                      <p class="text-gray-400">{row.event_address}</p>
                      <Link class="text-sky-500" href={`/events/${row.id}`}>
                        Details
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
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
