import { MetaFunction } from "@remix-run/node";
import NavBar from "~/components/NavBar";
import HeroSection from "~/components/HeroSection";
import Deadline from "~/components/Deadline";
import CompetitionsSection from "~/components/competitionsSection";
import ContactSection from "~/components/ContactSection";
import LeaderboardSection from "~/components/LeaderboardSection";
import FooterSection from "~/components/Footer";

export const meta: MetaFunction = () => {
  return [
    { title: "CyberNex 2025 – ICT Day | Kekirawa Central College" },
    {
      name: "description",
      content:
        "CyberNex is the first-ever ICT Day in North Central Province organized by Kekirawa Central College. Join competitions in coding, design, gaming, and innovation!",
    },
    { property: "og:title", content: "CyberNex 2025 – ICT Day" },
    {
      property: "og:description",
      content:
        "Celebrate innovation with coding, design, and eSports competitions at CyberNex 2025, hosted by Kekirawa Central College.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "CyberNex 2025 – ICT Day" },
    {
      name: "twitter:description",
      content:
        "North Central Province’s first ICT Day event. Engage in competitive and creative events in coding, design, and gaming.",
    },
    { name: "twitter:image", content: "/images/og-cover.png" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        {/* Vector Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/bg/Vector.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d14]/70 z-0" />

        {/* Content */}
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
