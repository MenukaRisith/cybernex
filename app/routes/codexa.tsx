// app/routes/codexa.tsx
import NavBar from "~/components/NavBar";
import FooterSection from "~/components/Footer";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Codexa – CyberNex 2025 | Code, Compete, Conquer" },
    {
      name: "description",
      content:
        "Join Codexa – the ultimate tech competition at CyberNex 2025. Show off your skills in Web Development, Game Development, or Algorithms. Grades 6–13 eligible.",
    },
    { property: "og:title", content: "Codexa – Tech Challenge Arena" },
    {
      property: "og:description",
      content:
        "Ready to code your way to the top? Codexa is where innovation meets skill. Part of the CyberNex 2025 ICT Day event.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Codexa – CyberNex 2025" },
    {
      name: "twitter:description",
      content:
        "CyberNex presents Codexa: a solo competition for future tech leaders. Take on the challenge in web dev, gaming, or algorithms.",
    },
  ];
};

export default function CodexaPage() {
  return (
    <>
      <NavBar />
      <div className="relative bg-[#0d0d14] text-white font-[DM_SANS] overflow-hidden">
        {/* Background Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/bg/Vector.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d14]/80 backdrop-blur-sm z-10" />

        {/* Hero */}
        <section className="relative z-20 min-h-[90vh] flex flex-col items-center justify-center text-center px-6 py-24 bg-gradient-to-br from-[#0d0d14] to-[#1a1a29]">
          <img
            src="/images/comp/codexa.svg"
            alt="Codexa Logo"
            className="w-56 md:w-72 mb-5 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold font-[Montserrat] text-white mb-4">
            Codexa – Tech Challenge Arena
          </h1>
          <p className="max-w-2xl text-gray-300 text-sm md:text-lg leading-relaxed mb-8">
            Codexa is your gateway to innovation, where coding meets creativity.
            Participate in Web Development, Game Development, or Algorithmic Problem Solving.
            Showcase your talent and stand out as a future tech leader.
          </p>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-md font-medium transition"
          >
            Register Now
          </Link>
        </section>

        {/* Tracks */}
        <section className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-16">
          {/* Web Dev */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat] text-center mb-6">
              Web Development
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-4 text-center">
              Build a dynamic web app to solve a real-world school or community problem. Let your creativity speak through design and functionality.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-3 text-base md:text-lg">
              <li>Grades 6–13, Individual Event</li>
              <li>Use HTML, CSS, JavaScript or frameworks like React/Vue</li>
              <li>Host on GitHub, Netlify, or Vercel</li>
              <li>Include a README file with documentation</li>
              <li>Originality is a must — plagiarism leads to disqualification</li>
            </ul>
          </div>

          {/* Game Dev */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat] text-center mb-6">
              Game Development
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-4 text-center">
              Create a game that’s fun, educational, or thought-provoking. Whether it’s platformer, puzzle, or interactive story — bring your imagination to life.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-3 text-base md:text-lg">
              <li>Grades 6–13, Individual Event</li>
              <li>Tools: Unity, Godot, or pure JavaScript (Canvas/WebGL)</li>
              <li>Provide playable build and source code via GitHub</li>
              <li>Include design explanation and mechanics in README</li>
              <li>Judged on creativity, polish, and gameplay</li>
            </ul>
          </div>

          {/* Algorithms */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat] text-center mb-6">
              Algorithmic Challenge
            </h2>
            <p className="text-gray-300 text-base md:text-lg mb-4 text-center">
              Tackle timed algorithm problems that test your logic, speed, and coding knowledge.
              Think fast, code smart.
            </p>
            <ul className="list-disc list-inside text-gray-300 space-y-3 text-base md:text-lg">
              <li>Grades 6–13, Individual Event</li>
              <li>Languages allowed: C++, Python, Java</li>
              <li>Hosted on a live platform with real-time leaderboard</li>
              <li>Participants must solve problems within the event window</li>
              <li>Scoring based on correctness, efficiency, and speed</li>
            </ul>
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}
