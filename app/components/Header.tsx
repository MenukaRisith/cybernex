import { Link, useLocation } from "@remix-run/react";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="bg-gray-900 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🎬 CineSphere
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <nav className="flex gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`hover:text-yellow-400 ${
                  location.pathname === link.href ? "text-yellow-400" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Login Button */}
          <Link
            to="/auth/login"
            className="ml-6 bg-yellow-400 text-black px-4 py-1.5 rounded hover:bg-yellow-300 transition"
          >
            Admin Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-3 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`block py-1 hover:text-yellow-400 ${
                location.pathname === link.href ? "text-yellow-400" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            to="/auth/login"
            className="block mt-2 bg-yellow-400 text-black px-4 py-2 rounded text-center hover:bg-yellow-300 transition"
            onClick={() => setIsOpen(false)}
          >
            Admin Login
          </Link>
        </div>
      )}
    </header>
  );
}
