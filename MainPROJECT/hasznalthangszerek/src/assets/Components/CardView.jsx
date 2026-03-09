import React from "react";
import Nav from "./Nav";
import axios from "../scripts/axios";
import Sidebar from "./cardView/Sidebar";
import Instruments from "./cardView/Instruments";
import { useState, useEffect, useRef } from "react";

const INS_URL = "/api/Instrument";

export default function CardView() {
  const [insList, setInsList] = useState([]);
  const navRef = useRef(null);

  // Görgetéskor és resize-kor frissíti a sidebar top értékét:
  // - oldal tetején: nav aljától kezdődik
  // - legörgetés után: viewport tetejétől (0px)
  useEffect(() => {
    const nav = document.querySelector("nav");

    function updateSidebarTop() {
      if (!nav) return;
      const navBottom = nav.getBoundingClientRect().bottom;
      // Ha a nav még látható (navBottom > 0), a sidebar alatta van
      // Ha már kigörgetett (navBottom <= 0), a sidebar a viewport tetején van
      const top = Math.max(0, navBottom);
      document.documentElement.style.setProperty("--nav-height", `${top}px`);
    }

    updateSidebarTop();
    window.addEventListener("scroll", updateSidebarTop, { passive: true });
    window.addEventListener("resize", updateSidebarTop);
    return () => {
      window.removeEventListener("scroll", updateSidebarTop);
      window.removeEventListener("resize", updateSidebarTop);
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(INS_URL, { withCredentials: true });
        setInsList(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchData();
  }, []);

  return (
    <div id="cardView">
      <Nav />
      <div id="testClassField">
        <Sidebar />
        <div className="card-container">
          <Instruments instruments={insList} />
        </div>
      </div>
    </div>
  );
}
