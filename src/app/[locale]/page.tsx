import { Advantages } from "@/components/sections/Advantages";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { Booking } from "@/components/sections/Booking";
import { Contacts } from "@/components/sections/Contacts";
import { Doctors } from "@/components/sections/Doctors";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Kids } from "@/components/sections/Kids";
import { Offer } from "@/components/sections/Offer";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { Reveal } from "@/components/ui/Reveal";

export default function HomePage() {
  return (
    <>
      {/* Hero is not animated: it is the first thing people see */}
      <Hero />
      <Reveal>
        <Advantages />
        <Services />
        <Kids />
        <BeforeAfter />
        <Doctors />
        <Process />
        <Offer />
        <Reviews />
        <Faq />
        <Booking />
        <Contacts />
      </Reveal>
    </>
  );
}
