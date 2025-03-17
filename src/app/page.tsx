import { NavBar } from "@/components/landingpage/navbar";
import Image from "next/image";
import {LandingCta} from "@/components/landingpage/cta";
import {LandingFeatures} from "@/components/landingpage/feature";
import {LandingFooter} from "@/components/landingpage/footer";
import {LandingHero} from "@/components/landingpage/hero";
import {LandingTestimonials} from "@/components/landingpage/testimonial";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col container justify-between mx-auto">
      <NavBar />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
