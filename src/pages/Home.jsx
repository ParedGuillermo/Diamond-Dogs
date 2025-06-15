import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import logoDD from "../assets/images/logo-dd.png";
import snakeImg from "../assets/images/snake.png";

export default function Home() {
  const { user, signOut } = useAuth();
  const [showSnake, setShowSnake] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setShowSnake(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bloodRed = "#C1272D";
  const darkBackground = "#0A0A0A";
  const darkGray = "#1A1A1A";
  const textGray = "#BBBBBB";

  return (
    <div
      style={{
        backgroundColor: darkBackground,
        minHeight: "100vh",
        padding: "2rem 1rem",
        color: textGray,
        fontFamily: "'Roboto Mono', monospace",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.8rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Snake visible solo en desktop */}
      {showSnake && (
        <img
          src={snakeImg}
          alt="Snake Phantom Pain"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "40vw",
            maxWidth: 400,
            opacity: 0.15,
            filter: `drop-shadow(0 0 8px ${bloodRed})`,
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* Logo */}
      <img
        src={logoDD}
        alt="Diamond Dogs Logo"
        style={{
          width: "70vw",
          maxWidth: 260,
          filter: `drop-shadow(0 0 10px ${bloodRed})`,
          mixBlendMode: "screen",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Bienvenida y logout */}
      <div
        style={{
          backgroundColor: darkGray,
          border: `2px solid ${bloodRed}`,
          borderRadius: 12,
          padding: "1.2rem 1.8rem",
          width: "90%",
          maxWidth: 400,
          textAlign: "center",
          boxShadow: `0 0 15px ${bloodRed}`,
          color: textGray,
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ fontSize: "1.2rem", marginBottom: 14 }}>
          Bienvenido, <strong style={{ color: bloodRed }}>{user?.email}</strong>
        </p>
        <button
          onClick={signOut}
          style={{
            padding: "0.8rem 1.8rem",
            backgroundColor: bloodRed,
            border: "none",
            borderRadius: 8,
            color: "#111",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            boxShadow: `0 0 12px ${bloodRed}`,
            transition: "background-color 0.3s ease",
            width: "100%",
            maxWidth: 220,
            margin: "0 auto",
            userSelect: "none",
            letterSpacing: "1.2px",
            textTransform: "uppercase",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#8B1B22")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bloodRed)}
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>

      {/* Status */}
      <section
        style={{
          backgroundColor: darkGray,
          border: `2px solid ${bloodRed}`,
          borderRadius: 12,
          padding: "1.2rem 1.8rem",
          maxWidth: 400,
          width: "90%",
          textAlign: "center",
          boxShadow: `0 0 15px ${bloodRed}`,
          fontSize: "1.1rem",
          color: textGray,
          letterSpacing: "0.8px",
          userSelect: "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        <p style={{ marginBottom: 14, color: bloodRed, fontWeight: "700" }}>
          STATUS: <span style={{ color: textGray }}>ALL CLEAR</span>
        </p>
        <p>
          VAPERS AVAILABLE: <span style={{ color: bloodRed }}>12 UNITS</span>
        </p>
      </section>
    </div>
  );
}
