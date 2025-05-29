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
      <div className="relative z-20 max-w-[1440px] mx-auto px-6 flex flex-col justify-center min-h-screen">
        <div className="ml-[166px]">
          {/* Top heading */}
          <p className="text-xl md:text-2xl font-bold uppercase text-white mb-6">
            First ever ICT day in North Central Province
          </p>

          {/* Logo */}
          <img
            src="/images/logo.png"
            alt="CyberNex Logo"
            className="w-[996px] h-[98px] object-contain drop-shadow-lg"
            style={{ boxShadow: "0px 4px 4px rgba(0,0,0,0.5)" }}
          />

          {/* Description */}
          <p className="text-white text-lg md:text-xl font-medium mt-6 w-[806px] leading-relaxed">
            CyberNex, the first-ever ICT Day of the Kekirawa Central College ICT Society, is a
            vibrant inter school competition platform celebrating technological innovation and
            collaboration.
          </p>

          {/* Buttons */}
          <div className="flex gap-6 mt-10">
            <Link
              to="/register"
              className="flex items-center gap-2 px-[30px] py-[12px] rounded-[10px] bg-[#4d76f4]/10 border border-white/25 hover:bg-[#4d76f4]/20 transition"
            >
              <i className="fas fa-user-plus text-white text-base" />
              <p className="text-sm md:text-base font-medium uppercase text-white">Register</p>
            </Link>

            <a
              href="#competitions"
              className="flex items-center gap-2 px-[30px] py-[12px] rounded-[10px] bg-[#4d76f4]/10 border border-white/25 hover:bg-[#4d76f4]/20 transition"
            >
              <i className="fas fa-layer-group text-white text-base" />
              <p className="text-sm md:text-base font-medium uppercase text-white">Competitions</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
