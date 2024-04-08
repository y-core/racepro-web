import { Resource, component$, useResource$ } from "@builder.io/qwik";
import { server$ } from "@builder.io/qwik-city";

import q from "^/database/query";

export interface Event {
  id: number;
  event_name: string;
  event_address: string;
  event_image: string;
  event_details: string;
}

const getData = server$(async function (): Promise<Event | null> {
  const db = this.platform.env["MAIN_DATA"];
  return await db.prepare(q.select().from("event").where(["id", this.params.id]).render()).first<Event>();
});

export default component$(() => {
  const data = useResource$(async () => {
    const res = await getData();

    if (!res) {
      throw Response.redirect("/");
    }

    return res;
  });

  return (
    <div class="container mx-auto">
      <div class="flex justify-between p-4">
        <div>
          <h1 class="text-2xl">Event</h1>
        </div>
      </div>
      <Resource
        value={data}
        onPending={() => <p>Loading ...</p>}
        onResolved={(row) => (
          <>
            <div class="grid grid-cols-3 gap-4">
              <div class="aspect-[4/3] rounded-lg bg-cover bg-center" style={`background-image:url('${row.event_image}')`}></div>
              <div class="p-6">
                <h3>{row.event_name}</h3>
                <p class="text-gray-400">{row.event_address}</p>
              </div>
            </div>
          </>
        )}
      />
    </div>
  );
});
