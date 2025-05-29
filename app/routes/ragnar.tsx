// app/routes/ragnar.tsx
import NavBar from "~/components/NavBar";
import FooterSection from "~/components/Footer";
import { Link } from "@remix-run/react";
import { motion } from "framer-motion";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Ragnar – CyberNex 2025 | Battle in the Arena" },
    {
      name: "description",
      content:
        "Enter Ragnar – the ultimate inter-school eSports showdown at CyberNex 2025. Rally your team and prove your dominance in Call of Duty Mobile.",
    },
    { property: "og:title", content: "Ragnar – eSports Tournament" },
    {
      property: "og:description",
      content:
        "5 players. 1 mission. Join the Ragnar eSports challenge and represent your school at CyberNex 2025.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Ragnar – CyberNex eSports 2025" },
    {
      name: "twitter:description",
      content:
        "Step into the battleground. CyberNex brings you Ragnar – an epic 5v5 CODM tournament for Sri Lankan schools.",
    },
  ];
};

export default function RagnarPage() {
  return (
    <>
      <NavBar />
      <div className="relative bg-[#0d0d14] font-[DM_SANS] text-white overflow-hidden">
        {/* Vector Background Grid */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/bg/Vector.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto",
          }}
        />
        <div className="absolute inset-0 bg-[#0d0d14]/80 z-10 backdrop-blur-sm" />

        {/* Main Content */}
        <main className="relative z-20">
          {/* Hero Section */}
          <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20">
            <motion.img
              src="/images/comp/ragnar.svg"
              alt="Ragnar Logo"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-56 md:w-72 mb-6 drop-shadow-[0_0_40px_rgba(255,200,100,0.3)]"
            />
            <motion.h1
              className="text-4xl md:text-5xl font-bold font-[Montserrat] text-amber-400 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ragnar – CODM Tournament
            </motion.h1>
            <motion.p
              className="max-w-2xl text-gray-300 text-base md:text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Battle it out in CyberNex’s most intense multiplayer gaming event. Compete with your school team in a fair, exciting and disciplined arena.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link
                to="/register"
                className="bg-amber-500 hover:bg-amber-600 text-black px-6 py-2 rounded-md font-semibold transition"
              >
                Register Now
              </Link>
              <a
                href="https://chat.whatsapp.com/IoXO7iKvajjFdTbGYgzqyc" // Replace this with your actual WhatsApp group link
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-semibold transition"
              >
                Join WhatsApp Group
              </a>
            </motion.div>
          </section>

          {/* Details Section */}
          <section className="max-w-4xl mx-auto px-6 md:px-12 pb-24">
            <motion.div
              className="bg-white/5 border border-amber-400/20 rounded-xl p-8 md:p-10 backdrop-blur-md shadow-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat] text-center mb-6">
                Competition Guidelines
              </h2>

              <ul className="list-disc list-inside space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
                <li>
                  <strong className="text-white">Team Composition:</strong> 5 players per team from the same school. A substitute is optional but must be pre-registered.
                </li>
                <li>
                  <strong className="text-white">Eligibility:</strong> Open to students from grades 9–13.
                </li>
                <li>
                  <strong className="text-white">Mode:</strong> Multiplayer mode (Match formats and maps will be announced soon).
                </li>
                <li>
                  <strong className="text-white">Device Rules:</strong> Players must bring and use their own mobile devices.
                </li>
                <li>
                  <strong className="text-white">Fair Play:</strong> Any use of hacks, emulators, or third-party software will lead to immediate disqualification.
                </li>
                <li>
                  <strong className="text-white">Behavior:</strong> Toxicity, foul language, or unsportsmanlike behavior is strictly prohibited.
                </li>
              </ul>

              <p className="text-sm text-gray-400 italic text-center mt-6">
                Detailed match rules and tournament structure will be shared soon via the official WhatsApp group and website.
              </p>
            </motion.div>
          </section>
        </main>
      </div>
      <FooterSection />
    </>
  );
}
