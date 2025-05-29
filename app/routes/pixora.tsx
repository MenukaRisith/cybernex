// app/routes/pixora.tsx
import NavBar from "~/components/NavBar";
import FooterSection from "~/components/Footer";
import { Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Pixora – CyberNex 2025 | Visual Creativity Challenge" },
    {
      name: "description",
      content:
        "Showcase your creativity in Pixora – the ultimate design battle of CyberNex 2025. Compete in Poster Design and Manipulation Arts. Let your visuals speak.",
    },
    { property: "og:title", content: "Pixora – Design Competition" },
    {
      property: "og:description",
      content:
        "From poster design to surreal manipulations, Pixora challenges young designers to go bold, creative, and original at CyberNex 2025.",
    },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Pixora – CyberNex 2025" },
    {
      name: "twitter:description",
      content:
        "Design with flair. Compete with impact. Join Pixora – the creative design competition at CyberNex 2025.",
    },
  ];
};

export default function PixoraPage() {
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
            src="/images/comp/pixora.svg"
            alt="Pixora Logo"
            className="w-56 md:w-72 mb-5 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
          />
          <h1 className="text-4xl md:text-5xl font-bold font-[Montserrat] text-white mb-4">
            Pixora – Design Competitions
          </h1>
          <p className="max-w-2xl text-gray-300 text-sm md:text-lg leading-relaxed mb-8">
            Enter the realm of creativity with Poster Design and Photo Manipulation events. Unleash your vision under the theme: “AI Heroes: Saving the World with Technology.”
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="bg-white hover:bg-gray-200 text-black px-6 py-2 rounded-md font-medium transition"
            >
              Register Now
            </Link>
            <a
              href="https://chat.whatsapp.com/your-group-invite-link" // Replace with your actual WhatsApp group link
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md font-medium transition"
            >
              Join WhatsApp Group
            </a>
          </div>
        </section>

        {/* Details Section */}
        <section className="relative z-20 max-w-5xl mx-auto px-6 md:px-12 py-20 space-y-16">
          {/* Poster Design */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat] text-center mb-6">
              Poster Design
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-3 text-base md:text-lg">
              <li><strong className="text-white">Eligibility:</strong> Grades 6–13. Individual event.</li>
              <li><strong className="text-white">Theme:</strong> “AI Heroes: Saving the World with Technology”</li>
              <li><strong className="text-white">Tools:</strong> Adobe Photoshop or Illustrator only.</li>
              <li><strong className="text-white">Submission:</strong> RAR file with final output (PNG/JPG/PDF) and a PDF of workspace screenshots & layers used.</li>
              <li><strong className="text-white">Scoring:</strong> Theme Relevance, Creativity, Visual Appeal, Technical Execution.</li>
            </ul>
          </div>

          {/* Photo Manipulation */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-10 backdrop-blur-md">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat] text-center mb-6">
              Photo Manipulation
            </h2>
            <ul className="list-disc list-inside text-gray-300 space-y-3 text-base md:text-lg">
              <li><strong className="text-white">Eligibility:</strong> Grades 6–13. Individual event.</li>
              <li><strong className="text-white">Theme:</strong> “AI Heroes: Saving the World with Technology”</li>
              <li><strong className="text-white">Tools:</strong> Adobe Photoshop only.</li>
              <li><strong className="text-white">Submission:</strong> RAR file with exported image and project files, plus a PDF with 5 process screenshots showing visible layers.</li>
              <li><strong className="text-white">Scoring:</strong> Creativity & Concept, Aesthetic Quality, Technical Execution, Theme Relevance.</li>
            </ul>
          </div>
        </section>
      </div>
      <FooterSection />
    </>
  );
}
