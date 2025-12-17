import { Link } from "react-router-dom";

export default function Header({ onOpenHelp, onOpenProvider }) {
  return (
    <header
      className="main-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(255, 255, 255, 0.98)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: 28,
          fontWeight: 900,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textDecoration: "none",
        }}
      >
        EZRA
      </Link>

      {/* Navigation */}
      <nav
        className="header-nav"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 32,
        }}
      >
        <button
          type="button"
          onClick={onOpenProvider}
          className="nav-link-desktop"
          style={{
            color: "#4b5563",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          Become an EZRA
        </button>

        <a
          href="#how-it-works"
          className="nav-link-desktop"
          style={{
            color: "#4b5563",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          How it Works
        </a>

        <a
          href="#"
          className="nav-link-desktop"
          style={{
            color: "#4b5563",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 15,
          }}
        >
          Login
        </a>

        <button
          type="button"
          onClick={onOpenHelp}
          style={{
            padding: "12px 24px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: 12,
            border: "none",
            fontWeight: 600,
            fontSize: 15,
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
            cursor: "pointer",
          }}
        >
          Get Help
        </button>
      </nav>
    </header>
  );
}
