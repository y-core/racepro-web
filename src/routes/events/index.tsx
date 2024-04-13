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
            <div class="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-6 py-6">
              {rows &&
                rows.map((row) => (                  
                  <div key={row.id} class="rounded-lg shadow-xl flex flex-col justify-between ">
                      <div>
                        <div class="aspect-[4/3] rounded-lg bg-cover bg-center m-2" style={`background-image:url('${row.event_image}')`}></div>
                        <div class="flex flex-col px-4 py-3 justify-between">
                          <div class="grid grid-cols-2 justify-between">
                            <div class="flex flex-col space-y-4">
                              <div>
                                <h3 class="text-xl font-bold">{row.event_name}</h3>
                              </div>
                              <div>
                                <p class="text-gray-400 text-l">{row.event_address}</p>
                                <div>
                                </div>
                              </div>
                              <p>18 Feb</p>
                            </div>
                            <div class="flex flex-col space-y-4">
                              <div class="flex justify-end justify-top text-white flex-wrap space-x-1">
                                <div class="rounded-full bg-blue-500 px-2" >5</div>
                                <div class="rounded-full bg-blue-600 px-2">10</div>
                                <div class="rounded-full bg-blue-700 px-2">21</div>
                                <div class="rounded-full bg-blue-800 px-2">42</div>
                              </div>
                              <div class="flex justify-end justify-top text-white flex-wrap space-x-2">
                                <div class="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-2 text-white" >From R {row.event_fees}</div>
                              </div>
                            </div>
                            <div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="mb-4 mx-4 text-white text-l font-bold text-center rounded-full bg-gradient-to-r from-emerald-800 to-emerald-600 p-4">
                        <Link href={`/events/${row.id}`}>
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



