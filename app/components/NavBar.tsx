import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "@remix-run/react";

const links = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
  { name: "Competitions", to: "#competitions", anchor: true },
  { name: "Leaderboard", to: "#leaderboard", anchor: true },
  { name: "Contact", to: "#contact", anchor: true },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleAnchorClick = (hash: string) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate(`/${hash}`);
    } else {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="absolute font-[Montserrat] top-6 left-0 w-full z-50 px-6 md:px-8 py-4">
      <div className="relative flex items-center justify-center max-w-7xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center gap-12">
          {links.map((link) =>
            link.anchor ? (
              <button
                key={link.to}
                onClick={() => handleAnchorClick(link.to)}
                className="text-white uppercase text-base tracking-wider font-semibold transition duration-200 opacity-80 hover:opacity-100"
              >
                {link.name}
              </button>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-white uppercase text-base tracking-wider font-semibold transition duration-200 ${
                    isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          )}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 text-white focus:outline-none"
        >
          <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-2xl`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mt-4 md:hidden flex flex-col items-center gap-4 bg-[#0d0d14]/80 py-6 rounded-lg backdrop-blur-md border border-white/10">
          {links.map((link) =>
            link.anchor ? (
              <button
                key={link.to}
                onClick={() => handleAnchorClick(link.to)}
                className="text-white uppercase text-sm font-semibold tracking-wide transition duration-200 opacity-80 hover:opacity-100"
              >
                {link.name}
              </button>
            ) : (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-white uppercase text-sm font-semibold tracking-wide transition duration-200 ${
                    isActive ? "opacity-100" : "opacity-80 hover:opacity-100"
                  }`
                }
              >
                {link.name}
              </NavLink>
            )
          )}
        </div>
      )}
    </nav>
  );
}
