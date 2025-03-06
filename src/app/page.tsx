import { LandingNavbar } from "@/components/landingpage/navbar"
import { LandingHero } from "@/components/landingpage/hero"
import { LandingFeatures } from "@/components/landingpage/feature"
import { LandingTestimonials } from "@/components/landingpage/testinomials"
import { LandingCta } from "@/components/landingpage/cta"
import { LandingFooter } from "@/components/landingpage/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingNavbar />
      <main className="flex-1">
        <LandingHero />
        <LandingFeatures />
        <LandingTestimonials />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  )
}

