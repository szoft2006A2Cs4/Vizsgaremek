import React, { useEffect } from "react";
import Nav from "./Nav";
import Sidebar from "./cardView/Sidebar";
import Instruments from "./cardView/Instruments";
import Loading from "./Loading";
import InstrumentData from "./InstrumentData";
import { useSearchParams } from "react-router-dom";

export default function CardView({ data, loading, subcatList, cats }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedInsId = searchParams.get("ins");

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

  if (loading || !data || subcatList.length === 0) return <Loading />;

  if (selectedInsId) {
    const selectedInstrument = data.find(
      (ins) => ins.id.toString() === selectedInsId,
    );

    if (selectedInstrument) {
      return <InstrumentData instrument={selectedInstrument} />;
    }
    setSearchParams({});
    return null;
  }

  const Filters = {
    category: searchParams.get("category"),
    subcategory: searchParams.get("subcategory"),
    price: searchParams.get("price"),
    conditions: searchParams.get("conditions")?.split(",") || [],
  };

  const handleFilterChange = (filterType, value) => {
    console.log("szuro valtozott:", filterType, value);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (filterType === "category") params.delete("subcategory");
      if (value && (Array.isArray(value) ? value.length > 0 : true)) {
        const formatValue = Array.isArray(value) ? value.join(",") : value;
        params.set(filterType, formatValue);
      } else {
        params.delete(filterType);
      }
      return params;
    });
  };

  const priceRanges = {
    "0 - 50 000 Ft": [0, 50000],
    "50 001 - 150 000 Ft": [50001, 150000],
    "150 001 - 300 000 Ft": [150001, 300000],
    "300 001 - 600 000 Ft": [300001, 600000],
    "600 000 Ft felett": [600000, Infinity],
  };

  const filteredInstruments = data.filter((ins) => {
    if (!ins) return false;

    if (Filters.category) {
      const subcat = subcatList.find((s) => s.name === ins.scName);
      if (
        !subcat ||
        subcat.cName.toLowerCase() !== Filters.category.toLocaleLowerCase()
      )
        return false;
    }

    if (Filters.subcategory && ins.scName !== Filters.subcategory) return false;

    if (Filters.price) {
      const [min, max] = priceRanges[Filters.price] ?? [0, Infinity];
      if (ins.cost < min || ins.cost > max) return false;
    }

    if (Filters.conditions.length > 0) {
      if (!Filters.conditions.includes(ins.condition?.toLowerCase()))
        return false;
    }
    return true;
  });

  return (
    <div id="cardView">
      <Nav />
      <div id="testClassField">
        <Sidebar
          onFilterChange={handleFilterChange}
          cats={cats}
          filters={Filters}
        />
        <div className="card-container">
          <Instruments instruments={filteredInstruments} />
        </div>
      </div>
    </div>
  );
}
