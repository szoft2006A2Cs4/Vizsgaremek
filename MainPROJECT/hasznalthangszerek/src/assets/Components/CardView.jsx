import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import axios from "../scripts/axios";
import Sidebar from "./cardView/Sidebar";
import Instruments from "./cardView/Instruments";
import Loading from "./Loading";

const INS_URL = "/api/Instrument";

export default function CardView() {
  const [insList, setInsList] = useState([]);
  const [subcatList, setSubcatList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: null,
    subcategory: null,
    price: null,
    conditions: [],
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  useEffect(() => {
    const nav = document.querySelector("nav");
    function updateSidebarTop() {
      if (!nav) return;
      const top = Math.max(0, nav.getBoundingClientRect().bottom);
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
      setIsLoading(true);
      try {
        const response = await axios.get(INS_URL, { withCredentials: true });
        setInsList(response.data);
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchSubcats() {
      try {
        const response = await axios.get("/api/Subcategory", {
          withCredentials: true,
        });
        setSubcatList(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSubcats();
  }, []);

  const priceRanges = {
    "0 - 50 000 Ft": [0, 50000],
    "50 001 - 150 000 Ft": [50001, 150000],
    "150 001 - 300 000 Ft": [150001, 300000],
    "300 001 - 600 000 Ft": [300001, 600000],
    "600 000 Ft felett": [600000, Infinity],
  };

  const filteredInstruments = insList.filter((ins) => {
    if (!ins) return false;
    if (filters.category) {
      const subcat = subcatList.find((s) => s.name === ins.scName);
      if (!subcat || subcat.cName !== filters.category) return false;
    }
    if (filters.subcategory && ins.scName !== filters.subcategory) return false;
    if (filters.price) {
      const [min, max] = priceRanges[filters.price] ?? [0, Infinity];
      if (ins.cost < min || ins.cost > max) return false;
    }
    if (filters.conditions.length > 0) {
      if (!filters.conditions.includes(ins.condition?.toLowerCase()))
        return false;
    }
    return true;
  });

  return (
    <div id="cardView">
      {isLoading && <Loading />}
      <Nav />
      <div id="testClassField">
        <Sidebar onFilterChange={handleFilterChange} />
        <div className="card-container">
          <Instruments instruments={filteredInstruments} />
        </div>
      </div>
    </div>
  );
}
