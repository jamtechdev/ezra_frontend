import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const SERVICE_OPTIONS = [
  {
    label: "Plumbing",
    description: "Leaks, clogs, installations & emergencies",
    to: "/plumbing",
  },
  {
    label: "Cleaning",
    description: "Apartments, offices & move-outs",
    to: "/cleaning",
  },
  {
    label: "Electrical",
    description: "Fixtures, lighting & troubleshooting",
    to: "/electrician",
  },
  {
    label: "Moving",
    description: "Packing, loading & relocation help",
    to: "/moving",
  },
  {
    label: "Assembly",
    description: "Furniture, equipment & IKEA pros",
    to: "/assembly",
  },
];

function ServiceDropdownButton({
  label,
  style,
  menuAlignment = "center",
  options = SERVICE_OPTIONS,
}) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleClickAway = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("touchstart", handleClickAway);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("touchstart", handleClickAway);
    };
  }, [open]);

  const resolveDestination = (option) => option.to ?? "/customer";

  const baseButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    fontWeight: 700,
    fontSize: 18,
    border: "none",
    cursor: "pointer",
    textDecoration: "none",
    borderRadius: 16,
    position: "relative",
    transition: "transform 0.2s, box-shadow 0.2s",
    ...style,
  };

  const caretStyle = {
    fontSize: 16,
    opacity: 0.7,
    transform: open ? "rotate(180deg)" : "rotate(0deg)",
    transition: "transform 0.2s",
  };

  const menuStyle = {
    position: "absolute",
    top: "calc(100% + 12px)",
    width: 320,
    background: "white",
    borderRadius: 20,
    boxShadow: "0 22px 60px rgba(79, 70, 229, 0.2)",
    border: "1px solid rgba(99, 102, 241, 0.12)",
    padding: "12px 0",
    zIndex: 20,
  };

  if (menuAlignment === "left") {
    menuStyle.left = 0;
  } else if (menuAlignment === "right") {
    menuStyle.right = 0;
  } else {
    menuStyle.left = "50%";
    menuStyle.transform = "translateX(-50%)";
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", display: "inline-block" }}
    >
      <button
        type="button"
        style={baseButtonStyle}
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-3px)";
          e.currentTarget.style.boxShadow =
            "0 16px 40px rgba(102, 126, 234, 0.35)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = style?.boxShadow ?? "none";
        }}
      >
        <span>{label}</span>
        <span style={caretStyle}>▾</span>
      </button>
      {open && (
        <div style={menuStyle}>
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => {
                setOpen(false);
                navigate(resolveDestination(option));
              }}
              style={{
                width: "100%",
                padding: "14px 22px",
                background: "transparent",
                border: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: 4,
                cursor: "pointer",
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(99, 102, 241, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              <span style={{ fontWeight: 700, color: "#1f2937", fontSize: 15 }}>
                {option.label}
              </span>
              {option.description && (
                <span style={{ fontSize: 13, color: "#6b7280" }}>
                  {option.description}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpForm, setHelpForm] = useState({
    name: "",
    email: "",
    phone: "",
    details: "",
  });
  const [helpStatus, setHelpStatus] = useState({ state: "idle", message: "" });

  const [showProviderModal, setShowProviderModal] = useState(false);
  const [providerForm, setProviderForm] = useState({
    name: "",
    phone: "",
    email: "",
    industry: "",
  });
  const [providerStatus, setProviderStatus] = useState({
    state: "idle",
    message: "",
  });
  const basePath = import.meta.env.BASE_URL;
  const images = [
    `${basePath}yitz_pic1.jpg`,
    `${basePath}yitz_pic2.jpg`,
    `${basePath}yitz_pic3.jpg`,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const categories = [
    {
      icon: "🚰",
      name: "Plumbing",
      desc: "Leaks, clogs & installations",
      to: "/plumbing",
    },
    {
      icon: "🔧",
      name: "Assembly",
      desc: "Furniture & equipment setup",
      to: "/assembly",
    },
    { icon: "📺", name: "Mounting", desc: "TVs, shelves & wall fixtures" },
    {
      icon: "📦",
      name: "Moving",
      desc: "Packing & relocation help",
      to: "/moving",
    },
    {
      icon: "🧹",
      name: "Cleaning",
      desc: "Deep cleaning & maintenance",
      to: "/cleaning",
    },
    {
      icon: "⚡",
      name: "Electrical",
      desc: "Fixtures\n& troubleshooting",
      to: "/electrician",
    },
    { icon: "🛠️", name: "Home Repairs", desc: "Fix-it tasks & maintenance" },
  ];

  const featuredProjects = [
    {
      title: "Furniture Assembly",
      price: "₪49",
      image: `${basePath}yitz_pic1.jpg`,
    },
    { title: "Mount a TV", price: "₪69", image: `${basePath}yitz_pic2.jpg` },
    {
      title: "Apartment Cleaning",
      price: "₪49",
      image: `${basePath}yitz_pic3.jpg`,
    },
    {
      title: "Minor Plumbing",
      price: "₪74",
      image: `${basePath}yitz_pic1.jpg`,
    },
    {
      title: "Electrical Help",
      price: "₪69",
      image: `${basePath}yitz_pic2.jpg`,
    },
    { title: "Moving Help", price: "₪99", image: `${basePath}yitz_pic3.jpg` },
  ];

  const openHelpModal = () => {
    setHelpStatus({ state: "idle", message: "" });
    setShowHelpModal(true);
  };

  const closeHelpModal = () => {
    if (helpStatus.state === "loading") return;
    setShowHelpModal(false);
  };

  const updateHelpField = (field, value) => {
    setHelpForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitHelp = async (e) => {
    e.preventDefault();
    setHelpStatus({ state: "loading", message: "Sending your request..." });
    try {
      const response = await fetch("/api/support/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: helpForm.name,
          email: helpForm.email,
          phone: helpForm.phone,
          description: helpForm.details,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setHelpStatus({
        state: "success",
        message: "Thanks! An Ezra will reach out shortly.",
      });
      setHelpForm({ name: "", email: "", phone: "", details: "" });
    } catch (error) {
      setHelpStatus({
        state: "error",
        message:
          "We could not send your request. Please try again or email Ezrainisrael1@gmail.com.",
      });
    }
  };

  const openProviderModal = () => {
    setProviderStatus({ state: "idle", message: "" });
    setShowProviderModal(true);
  };

  const closeProviderModal = () => {
    if (providerStatus.state === "loading") return;
    setShowProviderModal(false);
  };

  const updateProviderField = (field, value) => {
    setProviderForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmitProvider = async (e) => {
    e.preventDefault();
    setProviderStatus({
      state: "loading",
      message: "Submitting your interest...",
    });
    try {
      const response = await fetch("/api/providers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: providerForm.name,
          phone: providerForm.phone,
          email: providerForm.email,
          industry: providerForm.industry,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      setProviderStatus({
        state: "success",
        message: "Thanks! Our team will reach out within 1 business day.",
      });
      setProviderForm({ name: "", phone: "", email: "", industry: "" });
    } catch (error) {
      setProviderStatus({
        state: "error",
        message:
          "We could not process your request. Please try again or email Ezrainisrael1@gmail.com.",
      });
    }
  };

  const reviews = [
    {
      name: "Elizabeth P.",
      service: "IKEA Assembly",
      text: "Fast, friendly, and everything assembled perfectly!",
    },
    {
      name: "Tiffany B.",
      service: "Nursery Furniture",
      text: "Made setting up our baby's room so easy. Highly recommend!",
    },
    {
      name: "David R.",
      service: "TV Mounting",
      text: "Professional work, on time, and careful with our walls.",
    },
    {
      name: "Sarah M.",
      service: "Deep Cleaning",
      text: "Our apartment looks brand new. Worth every shekel!",
    },
    {
      name: "Michael K.",
      service: "Moving Help",
      text: "Moved our entire apartment efficiently. Great team!",
    },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff" }}>
      {/* NAV / HEADER - Sticky */}
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
        <div
          style={{
            fontSize: 28,
            fontWeight: 900,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          EZRA
        </div>
        <nav
          className="header-nav"
          style={{ display: "flex", alignItems: "center", gap: 32 }}
        >
          <button
            type="button"
            onClick={openProviderModal}
            className="p-5 nav-link-desktop"
            style={{
              color: "#4b5563",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 15,
              background: "transparent",
              border: "none",
              cursor: "pointer",
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
            onClick={openHelpModal}
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

      {/* CTA BUTTONS AT TOP */}
      <div
        style={{
          padding: "40px 20px",
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 640,
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: 18,
          }}
        >
          <ServiceDropdownButton
            label="Post a Service"
            menuAlignment="center"
            style={{
              padding: "20px 48px",
              background: "rgba(255, 255, 255, 0.98)",
              color: "#667eea",
              borderRadius: 16,
              fontSize: 18,
              fontWeight: 700,
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
              width: "100%",
              letterSpacing: "0.5px",
            }}
          />

          <button
            type="button"
            onClick={openProviderModal}
            style={{
              padding: "20px 48px",
              background: "rgba(255, 255, 255, 0.15)",
              color: "white",
              borderRadius: 16,
              fontSize: 18,
              fontWeight: 700,
              border: "2px solid rgba(255, 255, 255, 0.3)",
              backdropFilter: "blur(10px)",
              display: "block",
              letterSpacing: "0.5px",
              cursor: "pointer",
            }}
          >
            Become an EZRA
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "100px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 60,
          alignItems: "center",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#1a1a1a",
              marginBottom: 24,
              lineHeight: 1.1,
              letterSpacing: -2,
            }}
          >
            Hire skilled helpers for anything on your list.
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "#4b5563",
              marginBottom: 32,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            From mounting to moving, book trusted locals who show up ready to
            help.
          </p>
          <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
            <ServiceDropdownButton
              label="Get Help Today"
              menuAlignment="left"
              style={{
                padding: "18px 36px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 16,
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.4)",
              }}
            />
            <button
              type="button"
              onClick={openProviderModal}
              style={{
                padding: "18px 36px",
                background: "white",
                color: "#667eea",
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 16,
                border: "2px solid #667eea",
                cursor: "pointer",
              }}
            >
              Become an EZRA
            </button>
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              fontSize: 14,
              color: "#6b7280",
              fontWeight: 500,
            }}
          >
            <span>✓ Vetted</span>
            <span>•</span>
            <span>✓ Bilingual</span>
            <span>•</span>
            <span>✓ Transparent pricing</span>
          </div>
        </div>

        <div
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "500px" }}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Local provider ${idx + 1}`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: currentImage === idx ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
              color: "white",
              padding: "24px",
              fontSize: 14,
              fontWeight: 500,
            }}
          >
            Real local providers
          </div>
        </div>
      </section>

      {/* CATEGORY CAROUSEL - Scrolls Right */}
      <section
        style={{
          position: "relative",
          margin: "0 -80px",
          padding: "80px clamp(40px, 8vw, 120px)",
          background: "#f9fafb",
          overflow: "visible",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 48,
            color: "#1a1a1a",
          }}
        >
          Popular Services
        </h2>
        <div
          style={{
            display: "flex",
            gap: 24,
            overflow: "hidden",
            margin: "0 auto",
            maxWidth: 1600,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              animation: "scrollRight 30s linear infinite",
            }}
          >
            {[...categories, ...categories].map((cat, idx) => {
              const content = (
                <div
                  style={{
                    background: "white",
                    borderRadius: 20,
                    padding: "32px 24px",
                    textAlign: "center",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                    border: "1px solid #f3f4f6",
                    width: "220px",
                    minWidth: "220px",
                    height: "220px",
                    flexShrink: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                >
                  <div style={{ fontSize: 48 }}>{cat.icon}</div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      minHeight: 60,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 20,
                        fontWeight: 700,
                        margin: 0,
                        color: "#1a1a1a",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {cat.name}
                    </h3>
                    <p
                      style={{
                        fontSize: 14,
                        color: "#6b7280",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                    >
                      {cat.desc}
                    </p>
                  </div>
                </div>
              );

              if (cat.to) {
                return (
                  <Link
                    key={`${cat.name}-${idx}`}
                    to={cat.to}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      const card = e.currentTarget.firstChild;
                      card.style.transform = "translateY(-6px)";
                      card.style.boxShadow =
                        "0 12px 24px rgba(102, 126, 234, 0.2)";
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget.firstChild;
                      card.style.transform = "translateY(0)";
                      card.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
                    }}
                  >
                    {content}
                  </Link>
                );
              }

              return (
                <div
                  key={`${cat.name}-${idx}`}
                  style={{ display: "inline-block" }}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRENDING STATS */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 40px",
        }}
      >
        <div
          style={{
            background: "rgba(102, 126, 234, 0.05)",
            backdropFilter: "blur(10px)",
            borderRadius: 24,
            padding: "60px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            border: "1px solid rgba(102, 126, 234, 0.1)",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#667eea",
                marginBottom: 8,
              }}
            >
              3.4k+
            </div>
            <div style={{ fontSize: 16, color: "#6b7280", fontWeight: 500 }}>
              Furniture Assemblies
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#667eea",
                marginBottom: 8,
              }}
            >
              1.5k+
            </div>
            <div style={{ fontSize: 16, color: "#6b7280", fontWeight: 500 }}>
              Moving jobs
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#667eea",
                marginBottom: 8,
              }}
            >
              1k+
            </div>
            <div style={{ fontSize: 16, color: "#6b7280", fontWeight: 500 }}>
              Items Mounted
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 48,
                fontWeight: 900,
                color: "#667eea",
                marginBottom: 8,
              }}
            >
              890+
            </div>
            <div style={{ fontSize: 16, color: "#6b7280", fontWeight: 500 }}>
              Homes Cleaned
            </div>
          </div>
        </div>
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontSize: 13,
            color: "#9ca3af",
          }}
        >
          Global Benchmarks / Market Reference
        </p>
      </section>

      {/* CURRENT POSTINGS CAROUSEL - Scrolls Left */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 40px",
          background: "#ffffff",
          overflow: "hidden",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 48,
            color: "#1a1a1a",
          }}
        >
          Current Postings
        </h2>
        <div
          style={{
            display: "flex",
            gap: 24,
            overflow: "hidden",
            justifyContent: "flex-end",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 24,
              animation: "scrollLeft 40s linear infinite",
            }}
          >
            {[...featuredProjects, ...featuredProjects].map((project, idx) => (
              <div
                key={idx}
                style={{
                  background: "white",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                  border: "1px solid #f3f4f6",
                  transition: "transform 0.3s",
                  minWidth: "300px",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-8px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                <div
                  style={{ width: "100%", height: "200px", overflow: "hidden" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <h3
                    style={{
                      fontSize: 20,
                      fontWeight: 700,
                      marginBottom: 8,
                      color: "#1a1a1a",
                    }}
                  >
                    {project.title}
                  </h3>
                  <div
                    style={{ fontSize: 18, fontWeight: 700, color: "#667eea" }}
                  >
                    Starting at {project.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 40px",
          background: "#f9fafb",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: 42,
            fontWeight: 800,
            marginBottom: 48,
            color: "#1a1a1a",
          }}
        >
          People love working with skilled locals
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 24,
          }}
        >
          {reviews.map((review, idx) => (
            <div
              key={idx}
              style={{
                background: "white",
                borderRadius: 20,
                padding: "32px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                border: "1px solid #f3f4f6",
              }}
            >
              <p
                style={{
                  fontSize: 16,
                  color: "#4b5563",
                  marginBottom: 16,
                  lineHeight: 1.6,
                  fontStyle: "italic",
                }}
              >
                "{review.text}"
              </p>
              <div style={{ marginTop: "auto" }}>
                <div
                  style={{ fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}
                >
                  {review.name}
                </div>
                <div style={{ fontSize: 14, color: "#6b7280" }}>
                  {review.service}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST SECTION */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 40px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 40,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😊</div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 12,
                color: "#1a1a1a",
              }}
            >
              Happiness Guarantee
            </h3>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
              If you're not satisfied, we make it right.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 12,
                color: "#1a1a1a",
              }}
            >
              Vetted Providers
            </h3>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
              Documented skills and identity verified.
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>💬</div>
            <h3
              style={{
                fontSize: 24,
                fontWeight: 700,
                marginBottom: 12,
                color: "#1a1a1a",
              }}
            >
              Dedicated Support
            </h3>
            <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.6 }}>
              Real people, 7 days a week.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "80px 40px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}
        >
          <h2
            style={{
              fontSize: 42,
              fontWeight: 800,
              marginBottom: 16,
              color: "white",
            }}
          >
            How it Works
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.7,
              fontWeight: 500,
            }}
          >
            Ezra matches you with vetted pros for home services in minutes.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 32,
          }}
        >
          {[
            {
              number: "1",
              title: "Tell us what you need",
              text: "Describe the job and your address.",
            },
            {
              number: "2",
              title: "See available pros",
              text: "Compare prices, ratings, and arrival times.",
            },
            {
              number: "3",
              title: "Book & pay securely",
              text: "Reserve a time and pay in-app.",
            },
            {
              number: "4",
              title: "We’ve got your back",
              text: "Support + satisfaction guarantee.",
            },
          ].map((step) => (
            <div
              key={step.number}
              style={{
                textAlign: "center",
                color: "white",
                background: "rgba(255, 255, 255, 0.12)",
                borderRadius: 24,
                padding: "28px 20px",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(255,255,255,0.2)",
                boxShadow: "0 18px 40px rgba(79, 70, 229, 0.2)",
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  margin: "0 auto 18px",
                  background: "rgba(255,255,255,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: 26,
                  fontWeight: 800,
                }}
              >
                {step.number}
              </div>
              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 16, opacity: 0.9, lineHeight: 1.6 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="main-footer"
        style={{
          background: "#1a1a1a",
          color: "#9ca3af",
          padding: "60px 40px 40px",
        }}
      >
        <div
          className="footer-grid"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 40,
            marginBottom: 40,
          }}
        >
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: 16,
              }}
            >
              Discover
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Categories
              </a>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                How it works
              </a>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Reviews
              </a>
            </div>
          </div>
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: 16,
              }}
            >
              Become a Provider
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <Link
                to="/provider"
                style={{ color: "#9ca3af", textDecoration: "none" }}
              >
                Join as Provider
              </Link>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Earn Money
              </a>
            </div>
          </div>
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: 16,
              }}
            >
              Cities
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Tel Aviv
              </a>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Herzliya
              </a>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Ra’anana
              </a>
            </div>
          </div>
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: 16,
              }}
            >
              Support
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Help Center
              </a>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Contact Us
              </a>
            </div>
          </div>
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: 16,
              }}
            >
              Company
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                About
              </a>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Blog
              </a>
            </div>
          </div>
          <div>
            <h4
              style={{
                color: "white",
                fontWeight: 700,
                marginBottom: 16,
                fontSize: 16,
              }}
            >
              Legal
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                fontSize: 14,
              }}
            >
              <Link
                to="/terms"
                style={{ color: "#9ca3af", textDecoration: "none" }}
              >
                Terms
              </Link>
              <a href="#" style={{ color: "#9ca3af", textDecoration: "none" }}>
                Privacy
              </a>
            </div>
          </div>
        </div>
        <div
          className="footer-bottom"
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            paddingTop: 40,
            borderTop: "1px solid #374151",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 14,
          }}
        >
          <div className="footer-copyright">
            © 2024 EZRA. All rights reserved.
          </div>
          <div className="footer-social" style={{ display: "flex", gap: 20 }}>
            <span>📱</span>
            <span>🐦</span>
            <span>📘</span>
          </div>
        </div>
      </footer>

      {showProviderModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="provider-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(30, 41, 59, 0.45)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            zIndex: 2100,
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeProviderModal();
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              background: "white",
              borderRadius: 28,
              padding: "40px 36px",
              boxShadow: "0 42px 90px rgba(79, 70, 229, 0.28)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={closeProviderModal}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                border: "none",
                background: "rgba(226, 232, 240, 0.7)",
                color: "#475569",
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor:
                  providerStatus.state === "loading" ? "default" : "pointer",
                fontSize: 18,
                fontWeight: 700,
              }}
              disabled={providerStatus.state === "loading"}
            >
              ×
            </button>

            <h2
              id="provider-modal-title"
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              Become an EZRA
            </h2>
            <p
              style={{
                color: "#64748b",
                marginBottom: 28,
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              Tell us about yourself so we can get you verified and earning
              quickly.
            </p>

            <form
              onSubmit={handleSubmitProvider}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  Full Name
                </span>
                <input
                  type="text"
                  value={providerForm.name}
                  onChange={(e) => updateProviderField("name", e.target.value)}
                  required
                  placeholder="Yael Levi"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                  }}
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={providerForm.phone}
                  onChange={(e) => updateProviderField("phone", e.target.value)}
                  required
                  placeholder="+972 54 765 4321"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                  }}
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  Email Address{" "}
                  <span style={{ color: "#94a3b8" }}>(optional)</span>
                </span>
                <input
                  type="email"
                  value={providerForm.email}
                  onChange={(e) => updateProviderField("email", e.target.value)}
                  placeholder="name@example.com"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                  }}
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  Industry
                </span>
                <input
                  type="text"
                  value={providerForm.industry}
                  onChange={(e) =>
                    updateProviderField("industry", e.target.value)
                  }
                  required
                  placeholder="e.g. Plumbing, Assembly, Cleaning"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={providerStatus.state === "loading"}
                style={{
                  marginTop: 8,
                  padding: "16px 24px",
                  borderRadius: 16,
                  border: "none",
                  background:
                    providerStatus.state === "loading"
                      ? "linear-gradient(135deg, rgba(59,130,246,0.45) 0%, rgba(147,51,234,0.45) 100%)"
                      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor:
                    providerStatus.state === "loading" ? "default" : "pointer",
                  boxShadow: "0 20px 48px rgba(99, 102, 241, 0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (providerStatus.state !== "loading") {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 26px 56px rgba(99, 102, 241, 0.45)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (providerStatus.state !== "loading") {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 20px 48px rgba(99, 102, 241, 0.35)";
                  }
                }}
              >
                {providerStatus.state === "loading"
                  ? "Submitting..."
                  : "Submit application"}
              </button>

              {providerStatus.state !== "idle" && (
                <div
                  style={{
                    marginTop: 4,
                    padding: "12px 16px",
                    borderRadius: 12,
                    background:
                      providerStatus.state === "success"
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(239, 68, 68, 0.12)",
                    color:
                      providerStatus.state === "success"
                        ? "#047857"
                        : "#b91c1c",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {providerStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {showHelpModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17, 24, 39, 0.45)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
            zIndex: 2000,
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeHelpModal();
            }
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 520,
              background: "white",
              borderRadius: 28,
              padding: "40px 36px",
              boxShadow: "0 40px 80px rgba(79, 70, 229, 0.25)",
              position: "relative",
            }}
          >
            <button
              type="button"
              onClick={closeHelpModal}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                border: "none",
                background: "rgba(100, 116, 139, 0.12)",
                color: "#475569",
                width: 36,
                height: 36,
                borderRadius: "50%",
                cursor: helpStatus.state === "loading" ? "default" : "pointer",
                fontSize: 18,
                fontWeight: 700,
              }}
              disabled={helpStatus.state === "loading"}
            >
              ×
            </button>

            <h2
              id="help-modal-title"
              style={{
                fontSize: 30,
                fontWeight: 900,
                color: "#1f2937",
                marginBottom: 8,
              }}
            >
              Get help from Ezra
            </h2>
            <p
              style={{
                color: "#64748b",
                marginBottom: 28,
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              Share a few details and we’ll route your request to our support
              team instantly.
            </p>

            <form
              onSubmit={handleSubmitHelp}
              style={{ display: "flex", flexDirection: "column", gap: 18 }}
            >
              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  Full Name
                </span>
                <input
                  type="text"
                  value={helpForm.name}
                  onChange={(e) => updateHelpField("name", e.target.value)}
                  required
                  placeholder="Shai Cohen"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                  }}
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  Email Address
                </span>
                <input
                  type="email"
                  value={helpForm.email}
                  onChange={(e) => updateHelpField("email", e.target.value)}
                  required
                  placeholder="name@example.com"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                  }}
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  Phone Number
                </span>
                <input
                  type="tel"
                  value={helpForm.phone}
                  onChange={(e) => updateHelpField("phone", e.target.value)}
                  required
                  placeholder="+972 54 123 4567"
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                  }}
                />
              </label>

              <label
                style={{ display: "flex", flexDirection: "column", gap: 8 }}
              >
                <span
                  style={{ fontWeight: 700, color: "#1f2937", fontSize: 14 }}
                >
                  What do you need help with?
                </span>
                <textarea
                  value={helpForm.details}
                  onChange={(e) => updateHelpField("details", e.target.value)}
                  required
                  rows={5}
                  placeholder="Describe the job, timing, and address..."
                  style={{
                    padding: "14px 16px",
                    borderRadius: 14,
                    border: "2px solid #e2e8f0",
                    fontSize: 15,
                    resize: "vertical",
                  }}
                />
              </label>

              <button
                type="submit"
                disabled={helpStatus.state === "loading"}
                style={{
                  marginTop: 8,
                  padding: "16px 24px",
                  borderRadius: 16,
                  border: "none",
                  background:
                    helpStatus.state === "loading"
                      ? "linear-gradient(135deg, rgba(102,126,234,0.5) 0%, rgba(118,75,162,0.5) 100%)"
                      : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  fontWeight: 700,
                  fontSize: 16,
                  cursor:
                    helpStatus.state === "loading" ? "default" : "pointer",
                  boxShadow: "0 18px 42px rgba(102, 126, 234, 0.35)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (helpStatus.state !== "loading") {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 24px 50px rgba(102, 126, 234, 0.45)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (helpStatus.state !== "loading") {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 18px 42px rgba(102, 126, 234, 0.35)";
                  }
                }}
              >
                {helpStatus.state === "loading" ? "Sending..." : "Send request"}
              </button>

              {helpStatus.state !== "idle" && (
                <div
                  style={{
                    marginTop: 4,
                    padding: "12px 16px",
                    borderRadius: 12,
                    background:
                      helpStatus.state === "success"
                        ? "rgba(16, 185, 129, 0.12)"
                        : "rgba(239, 68, 68, 0.12)",
                    color:
                      helpStatus.state === "success" ? "#047857" : "#b91c1c",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {helpStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scrollRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(50%);
          }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-20px, 20px) rotate(240deg); }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .main-header {
            padding: 12px 20px !important;
          }

          .header-nav {
            gap: 12px !important;
          }

          .nav-link-desktop {
            display: none !important;
          }

          .hero-section {
            grid-template-columns: 1fr !important;
            padding: 60px 20px !important;
            gap: 40px !important;
          }

          .hero-section h1 {
            font-size: 36px !important;
          }

          .footer-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 30px !important;
            padding: 40px 20px 30px !important;
          }

          .main-footer {
            padding: 40px 20px 30px !important;
          }

          .footer-bottom {
            flex-direction: column !important;
            gap: 20px !important;
            text-align: center !important;
            padding-top: 30px !important;
          }

          .footer-copyright {
            font-size: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .hero-section h1 {
            font-size: 32px !important;
          }

          .hero-section {
            padding: 40px 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
