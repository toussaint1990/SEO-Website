import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

const sectionTransition = {
  duration: 0.6,
  ease: "easeOut",
};

// Base URL for API (dev uses live site, prod uses relative path)
const API_BASE =
  import.meta.env.MODE === "development"
    ? "https://toussaintdigitaldevelopments.com"
    : "";

/* ---------- Reusable Spinning World Globe (world map style) ---------- */

function SpinningGlobe({ sizeClass = "w-16 h-16" }) {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`relative flex items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-sky-500 to-blue-900 shadow-lg shadow-sky-500/40 ${sizeClass} animate-spin`}
        style={{ animationDuration: "4s" }} // full spin every 4 seconds
      >
        <div className="absolute inset-0 rounded-full bg-sky-300/15 blur-xl" />
        <span className="relative text-3xl sm:text-4xl">🌎</span>
      </div>
    </div>
  );
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
      setShowFab(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll);
    return
