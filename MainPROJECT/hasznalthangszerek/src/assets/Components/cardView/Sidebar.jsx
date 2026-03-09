import React, { useState, useEffect, useCallback } from "react";
import Category from "./sidebar/Category";
import Subcategory from "./sidebar/Subcategory";
import Price from "./sidebar/Price";
import Condition from "./sidebar/Condition";

function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches,
  );

  // Képernyőméret figyelése (mobil + tablet)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // ESC billentyűre bezárás
  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [sidebarOpen]);

  // Scroll zárolás
  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const toggleSidebar = useCallback(() => setSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <>
      {/* Overlay – csak mobilon, nyitott állapotban */}
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay open" onClick={closeSidebar} />
      )}

      {/* Sidebar wrapper mobilon, sima section desktopon */}
      <section
        className={
          isMobile
            ? `sidebar mobile-sidebar-wrapper${sidebarOpen ? " open" : ""}`
            : "sidebar"
        }
      >
        <Category />
        <Subcategory />
        <Price />
        <Condition />
      </section>

      {/* Lebegő toggle gomb – csak mobilon */}
      {isMobile && (
        <button
          id="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label="Szűrők megnyitása"
          aria-expanded={sidebarOpen}
        >
          <span
            style={{
              transform: sidebarOpen
                ? "rotate(45deg) translate(5px, 5px)"
                : "none",
              transition: "transform 200ms ease",
            }}
          />
          <span
            style={{
              opacity: sidebarOpen ? 0 : 1,
              transition: "opacity 150ms ease",
            }}
          />
          <span
            style={{
              transform: sidebarOpen
                ? "rotate(-45deg) translate(5px, -5px)"
                : "none",
              transition: "transform 200ms ease",
            }}
          />
        </button>
      )}
    </>
  );
}

export default Sidebar;
