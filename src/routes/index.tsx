import { component$ } from "@builder.io/qwik";
// import { images } from "~/constants";
import { Footer, Nav } from "~/components";

export { head } from "~/constants";

export default component$(() => {
  return (
    <>
      <div class="relative mx-auto sm:max-w-prose lg:max-w-screen-lg">
        <header></header>
        <Nav />
        <section>
        </section>
        <section></section>
        <section id="about"></section>
        <section>
        </section>
        <hr />
        <section id="contact">
        </section>
        <Footer />
      </div>
    </>
  );
});
