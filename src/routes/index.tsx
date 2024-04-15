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
        {/* Page */}
        <div class="flex flex-row">
          <div class="flex flex-col">
            <div class="space-y-8 text-center">
              <div class="text-5xl font-bold">
                EntriGo - Your One-Stop Race Entry App
              </div>
              <div class="">
                At EntriGo, we're revolutionizing the racing experience for both event organizers and athletes. Our platform offers a host of cutting-edge features designed to streamline every aspect of the racing journey. Whether you're an event organizer seeking seamless management or an athlete craving convenience, EntriGo has you covered.
              </div>
              <div class="flex flex-row justify-center">
                <div class = "mb-4 mx-4 text-white text-l font-bold text-center rounded-full bg-gradient-to-r from-emerald-800 to-emerald-600 p-4">
                  Button 1
                </div>
                <div class = "mb-4 mx-4 text-white text-l font-bold text-center rounded-full bg-gradient-to-r from-emerald-800 to-emerald-600 p-4">
                  Button 2
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="bg-sky-500 w-60 h-60"></div>
          </div>
        </div>
        <div class = "">
          Transition
        </div>
        <div class = "">
        Join the EntriGo Community
        </div>
        <div>
        EntriGo is more than just an app, it's a community of like-minded individuals who share the same passion for sports. Connect with other athletes, share your experiences, and get inspired by others. Join us today and become a part of the EntriGo family.       
         </div>
         <div class ="">
         Seamless Payments
         </div>
         <div class ="">
         Effortlessly manage all payments, from entrants to club members, with our seamless payment system. Set up scheduled payments for club members, ensuring smooth transactions every time.
         </div>
         <div class ="">
          Direct Marketing
         </div>
         <div class ="">
         Access our extensive user base for targeted event notifications, maximising event participation. Reach thousands of athletes in your area with ease, boosting event visibility and engagement.
         </div>
         <div class ="">
          Event Analytics
         </div>
         <div>
         Stay ahead of the curve with detailed analytics of your events, enabling informed decision-making. Track participant engagement and event performance to optimize future races and enhance the overall experience.
         </div>
         <div>
         Racing Compliance
         </div>
         <div>
         Let us handle the details while you focus on the event itself. Ensure racing compliance effortlessly, from police support to race number printing and distribution, for a stress-free event management experience.
         </div>
         <div>
         Club Management:
          </div>
          <div>
          Simplify club management tasks with our comprehensive club management feature. From membership tracking to communication tools, our platform empowers club administrators to streamline operations and engage members effectively.
          </div>
         <div>
         Trusted by Athletes Everywhere
         </div>
         <div>
         How Does EntriGo Work?
         </div>
         <div>
          Easy Race Entry
         </div>
         <div>
         Direct Marketing to Athletes
         </div>
         <div>
         Personalized Profiles
         </div>
         <div>
         Real-Time Updates
         </div>
         <div>
         Join EntriGo Today
         </div>
         <div>
          button
         </div>
         <div>
          Race event registration
          Online event registration
          Event registration platform
          Race management software
          Event registration management
          Event sign-up platform
          Race registration system
          Event registration service
          Participant registration portal
          Race entry management
          Event registration tool
          Race registration website
          Event entry platform
          Race registration solution
          Event registration management system
          Race participant registration
          Event registration software
          Race entry portal
          Event registration technology
          Race registration platform
         </div>

        <Footer />
      </div>
    </>
  );
});


