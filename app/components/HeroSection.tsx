import { Link } from "@remix-run/react";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen text-white font-[DM_SANS] overflow-hidden bg-[#0d0d14]">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/bg/hero.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[1440px] mx-auto px-4 md:px-10 flex flex-col justify-center min-h-screen">
        <div className="ml-0 md:ml-[60px] lg:ml-[166px] text-center md:text-left">
          {/* Top heading */}
          <p className="text-base sm:text-lg md:text-2xl font-bold uppercase text-white mb-4 md:mb-6">
            First ever ICT day in North Central Province
          </p>

          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="CyberNex Logo"
            className="w-[260px] sm:w-[480px] md:w-[700px] lg:w-[996px] h-auto object-contain drop-shadow-lg mx-auto md:mx-0"
          />

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-medium mt-5 md:mt-6 max-w-full md:max-w-[700px] lg:max-w-[806px] leading-relaxed mx-auto md:mx-0">
            CyberNex, the first-ever ICT Day of the Kekirawa Central College ICT Society, is a
            vibrant inter school competition platform celebrating technological innovation and
            collaboration.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 md:mt-10 items-center md:items-start">
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-[10px] bg-[#4d76f4]/10 border border-white/25 hover:bg-[#4d76f4]/20 transition"
            >
              <i className="fas fa-user-plus text-white text-sm sm:text-base" />
              <p className="text-xs sm:text-sm md:text-base font-medium uppercase text-white">Register</p>
            </Link>

            <a
              href="#competitions"
              className="flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-[10px] bg-[#4d76f4]/10 border border-white/25 hover:bg-[#4d76f4]/20 transition"
            >
              <i className="fas fa-layer-group text-white text-sm sm:text-base" />
              <p className="text-xs sm:text-sm md:text-base font-medium uppercase text-white">Competitions</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
