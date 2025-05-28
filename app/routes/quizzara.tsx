// app/routes/quizzara.tsx
import NavBar from "~/components/NavBar";
import FooterSection from "~/components/Footer";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Quizzara – CyberNex 2025 | Inter-School Quiz Competition" },
    {
      name: "description",
      content:
        "Put your knowledge to the test in Quizzara, the thrilling quiz challenge of CyberNex 2025. Compete in teams and rise up the leaderboard.",
    },
    { property: "og:title", content: "Quizzara – Inter-School Quiz Challenge" },
    {
      property: "og:description",
      content:
        "Think fast, answer smart. Join the most anticipated quiz competition at CyberNex 2025 and represent your school with pride.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Quizzara – CyberNex 2025" },
    {
      name: "twitter:description",
      content:
        "Form your team and get ready for Quizzara – the competitive and fun-filled quiz event at CyberNex 2025.",
    },
  ];
};


export default function QuizzaraPage() {
  return (
    <>
      <NavBar />
      <div className="relative bg-[#0d0d14] text-white font-[DM_SANS] overflow-hidden">
        {/* Grid Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/bg/Vector.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d14]/80 backdrop-blur-sm z-10" />

        {/* Hero Section */}
        <section className="relative z-20 min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-br from-[#0d0d14] to-[#1a1a29]">
          <img
            src="/images/comp/quizzara.svg"
            alt="Quizzara Logo"
            className="w-56 md:w-72 mb-5 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold font-[Montserrat] text-white mb-4">
            Quizzara – Ultimate ICT Quiz Battle
          </h1>
          <p className="max-w-2xl text-gray-300 text-sm md:text-lg leading-relaxed mb-8">
            Face off in an electrifying battle of knowledge as teams compete in rounds covering ICT, technology, innovation, and general knowledge. Fast thinking. Sharp minds. One winner.
          </p>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-md font-medium transition"
          >
            Register Now
          </Link>
        </section>

        {/* Rules Section */}
        <section className="relative z-20 max-w-4xl mx-auto px-6 md:px-12 py-20">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat] text-center mb-6">
              Competition Guidelines
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-4 text-base md:text-lg leading-relaxed">
              <li><strong className="text-white">Team Format:</strong> 3 members per team from the same school.</li>
              <li><strong className="text-white">Eligibility:</strong> Grades 9–13.</li>
              <li><strong className="text-white">Topic Coverage:</strong> ICT, Computer Science, General Tech, and Innovation.</li>
              <li><strong className="text-white">Structure:</strong> Preliminary rounds + Final battle.</li>
              <li><strong className="text-white">Rules:</strong> No mobile devices or external support during the quiz.</li>
              <li><strong className="text-white">Fair Play:</strong> Malpractice or disruptive behavior will lead to disqualification.</li>
            </ul>

            <p className="text-sm text-gray-400 italic text-center mt-6">
              Round formats, timings, and final details will be shared closer to the event via official CyberNex channels.
            </p>
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}
