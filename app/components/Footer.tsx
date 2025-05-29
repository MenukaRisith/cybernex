import { Link } from "@remix-run/react";

export default function FooterSection() {
  return (
    <footer className="w-full bg-black/25 px-6 sm:px-12 md:px-[100px] py-[50px] text-white font-[DM_SANS]">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-[40px]">
        {/* Logos */}
        <div className="flex items-center gap-4">
          <img
            src="/images/logos/scl-logo.png"
            alt="School Logo"
            className="w-[65px] h-[65px] object-cover"
          />
          <img
            src="/images/logos/kccicts-logo.png"
            alt="KCC ICTS Logo"
            className="w-[120px] h-[50px] object-contain"
          />
        </div>

        {/* Content Columns */}
        <div className="flex flex-col lg:flex-row justify-between w-full gap-10">
          {/* Address */}
          <div className="max-w-[360px] space-y-3">
            <p className="text-xl font-bold uppercase">Address</p>
            <p className="text-[#b5b5b5] text-base leading-snug">
              ICT Society,<br></br>Central College,<br></br>Kekirawa.
            </p>
          </div>

          {/* Links + Info - Grid Layout */}
          <div className="grid grid-cols-2 gap-[60px]">
            {/* Links */}
            <div className="flex flex-col space-y-2.5">
              <p className="text-xl font-bold uppercase">Links</p>
              <Link to="/about" className="text-base text-[#b5b5b5] hover:text-white transition">About</Link>
              <Link to="/competitions" className="text-base text-[#b5b5b5] hover:text-white transition">Competitions</Link>
              <Link to="/leaderboard" className="text-base text-[#b5b5b5] hover:text-white transition">Leaderboard</Link>
              <Link to="/contact" className="text-base text-[#b5b5b5] hover:text-white transition">Contact</Link>
            </div>

            {/* Info */}
            <div className="flex flex-col space-y-2.5">
              <p className="text-xl font-bold uppercase">Info</p>
              <Link to="/privacy" className="text-base text-[#b5b5b5] hover:text-white transition">Privacy Policy</Link>
              <Link to="/terms" className="text-base text-[#b5b5b5] hover:text-white transition">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-white/20" />

        {/* Bottom Row */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <p className="text-base text-[#b5b5b5]">Copyright © 2025</p>
          <div className="flex gap-4 text-[#989899] text-xl">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com/kccicts" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com/kccicts" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
