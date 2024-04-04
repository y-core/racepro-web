import { component$ } from "@builder.io/qwik";

import { useLocation, useContent } from "@builder.io/qwik-city";

export default component$(() => {
  const { menu } = useContent();
  const { url } = useLocation();

  return (
    <nav class="flex flex-row">
      <>
        <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <button
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-neutral-500 focus:outline-none focus:ring-2 focus:ring-neutral-200 md:hidden"
            data-collapse-toggle="navbar-default"
            type="button"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg class="h-4 w-4 fill-current stroke-current stroke-2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Open Menu</title>
              <path d="M0 3h20 M0 9h20 M0 15h20" />
            </svg>
          </button>
          <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            {!menu
              ? null
              : menu.items?.map((item) => (
                  // eslint-disable-next-line qwik/jsx-key
                  <ul class="border-nx-gray mt-4 flex flex-col rounded-lg border p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0">
                    {item.items?.map((item) => (
                      // eslint-disable-next-line qwik/jsx-key
                      <li class="">
                        <a
                          href={item.href}
                          class={{
                            "block rounded py-2 pl-3 pr-4 uppercase tracking-wider md:bg-transparent md:p-0 ": true,
                            "": url.pathname === item.href,
                          }}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
          </div>
        </div>
      </>
    </nav>
  );
});
