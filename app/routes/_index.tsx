import NavBar from "~/components/NavBar";
import HeroSection from "~/components/HeroSection";
import Deadline from "~/components/Deadline";
import CompetitionsSection from "~/components/competitionsSection";
import ContactSection from "~/components/ContactSection";
import LeaderboardSection from "~/components/LeaderboardSection";
import FooterSection from "~/components/Footer";

export default function Index() {
  return (
    <>
    <div className="relative min-h-screen overflow-hidden">
      {/* Repeating Vector.svg background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/bg/Vector.svg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
      
      {/* Dark overlay on top of vector */}
      <div className="absolute inset-0 bg-[#0d0d14]/70 z-0" />

      {/* Page content */}
      <div className="relative z-10">
        <NavBar />
        <HeroSection />
        <Deadline />
        <CompetitionsSection />
        <ContactSection />
        <LeaderboardSection />
      </div>
    </div>
    <FooterSection />
    </>
  );
}
