import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <footer class="block bg-opacity-100 py-12 text-center leading-7 text-opacity-30">
      <div class="mx-auto w-full px-4 text-center">
        <p class="m-0 text-xs font-thin uppercase">Copyright © 2020 - {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
});
