import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header({ onOpenHelp, onOpenProvider }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[1000] bg-white/95 backdrop-blur-xl border-b border-black/10 px-6 py-2 md:px-10 md:py-4 flex justify-between items-center">
      {/* Logo */}
      <Link
        to="/"
        className="text-2xl md:text-3xl font-black bg-gradient-to-br from-indigo-400 to-purple-600 bg-clip-text text-transparent no-underline"
      >
        <img src="/assets/images/logo.jpg" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 text-[15px]">
        <button
          type="button"
          onClick={onOpenProvider}
          className="text-gray-600 font-medium bg-transparent border-none cursor-pointer hover:text-indigo-500 transition"
        >
          Become an EZRA
        </button>

        <a
          href="#how-it-works"
          className="text-gray-600 font-medium no-underline hover:text-indigo-500 transition"
        >
          How it Works
        </a>

        <a
          href="#"
          className="text-gray-600 font-medium no-underline hover:text-indigo-500 transition"
        >
          Login
        </a>

        <button
          type="button"
          onClick={onOpenHelp}
          className="px-6 py-3 btn-gradient text-white rounded-lg font-semibold shadow-lg shadow-indigo-400/30 cursor-pointer transition-transform hover:-translate-y-0.5"
        >
          Get Help
        </button>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
        onClick={() => setIsMenuOpen(true)}
      >
        <span className="block w-full h-0.5 bg-gray-600"></span>
        <span className="block w-full h-0.5 bg-gray-600"></span>
        <span className="block w-full h-0.5 bg-gray-600"></span>
      </button>

      {/* Offcanvas Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 text-2xl font-bold"
          onClick={() => setIsMenuOpen(false)}
        >
          &times;
        </button>

        {/* Mobile Nav Items */}
        <nav className="flex flex-col bg-white mt-10 space-y-6 px-6 pb-6 text-[16px]">
          <button
            type="button"
            onClick={() => {
              onOpenProvider();
              setIsMenuOpen(false);
            }}
            className="text-gray-700 text-start font-medium hover:text-indigo-500 transition"
          >
            Become an EZRA
          </button>

          <a
            href="#how-it-works"
            className="text-gray-700 font-medium hover:text-indigo-500 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            How it Works
          </a>

          <a
            href="#"
            className="text-gray-700 font-medium hover:text-indigo-500 transition"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </a>

          <button
            type="button"
            onClick={() => {
              onOpenHelp();
              setIsMenuOpen(false);
            }}
            className="px-6 py-3 btn-gradient text-white rounded-lg font-semibold shadow-lg shadow-indigo-400/30 cursor-pointer transition-transform hover:-translate-y-0.5"
          >
            Get Help
          </button>
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}
