import { Advantages } from "@/components/sections/Advantages";
import { Contacts } from "@/components/sections/Contacts";
import { Doctors } from "@/components/sections/Doctors";
import { Hero } from "@/components/sections/Hero";
import { Offer } from "@/components/sections/Offer";
import { Process } from "@/components/sections/Process";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Advantages />
      <Doctors />
      <Process />
      <Offer />
      <Contacts />
    </>
  );
}
