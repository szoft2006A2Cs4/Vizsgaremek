import React, { useEffect, useState } from "react";

const CONDITIONS = [
  "újszerű",
  "kiváló",
  "jó",
  "átlagos",
  "használt",
  "hibás-rossz",
];

function Condition({ onFilterChange, filters }) {
  const [selected, setSelected] = useState(filters?.conditions || []);

  const handleAll = () => {
    setSelected([]);
    onFilterChange("conditions", []);
  };

  useEffect(() => {
    setSelected(filters?.conditions || []);
  }, [filters?.conditions]);

  const handleChange = (value) => {
    setSelected((prev) => {
      const next = prev.includes(value)
        ? prev.filter((c) => c !== value)
        : [...prev, value];
      onFilterChange("conditions", next);
      return next;
    });
  };

  return (
    <div>
      <h2 className="sidebar-title">Állapot</h2>
      <div className="filter-selector">
        <label className="sidebar-label-container">
          <input
            type="checkbox"
            name="condition"
            checked={selected.length === 0}
            onChange={handleAll}
          />
          <span className="checkbox"></span>Minden
        </label>
        {CONDITIONS.map((cond) => (
          <label key={cond} className="sidebar-label-container">
            <input
              type="checkbox"
              name="condition"
              value={cond}
              checked={selected.includes(cond)}
              onChange={() => handleChange(cond)}
            />
            <span className="checkbox"></span>
            {cond.charAt(0).toUpperCase() + cond.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Condition;
