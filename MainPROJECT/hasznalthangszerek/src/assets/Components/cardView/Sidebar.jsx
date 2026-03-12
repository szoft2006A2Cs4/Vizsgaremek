import React, { useState, useEffect, useCallback } from "react";
import Category from "./sidebar/Category";
import Price from "./sidebar/Price";
import Condition from "./sidebar/Condition";
import axios from "../../scripts/axios";

const CAT_URL = "/api/Category";
const SCAT_URL = "/api/Subcategory";

function Sidebar({ onFilterChange, subcatList }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches,
  );
  const [catList, setCatList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(CAT_URL, { withCredentials: true });
        setCatList(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setSidebarOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [sidebarOpen]);

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
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay open" onClick={closeSidebar} />
      )}

      <section
        className={
          isMobile
            ? `sidebar mobile-sidebar-wrapper${sidebarOpen ? " open" : ""}`
            : "sidebar"
        }
      >
        <Category
          categories={catList}
          subcategories={subcatList} // ← már propból jön
          onFilterChange={onFilterChange}
        />
        <Price onFilterChange={onFilterChange} />
        <Condition onFilterChange={onFilterChange} />
      </section>

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
