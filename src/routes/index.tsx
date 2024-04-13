import { component$ } from "@builder.io/qwik";
import { Footer, Nav } from "~/components";

export { head } from "~/constants";

export default component$(() => {
  return (
    <>
      <div class="relative mx-auto sm:max-w-prose lg:max-w-screen-lg">
        <header></header>
        <Nav />
        <section id="about"></section>
        <hr />
        <section id="contact"></section>
        <section class = ""></section>
        <Footer />
      </div>
    </>
  );
});


