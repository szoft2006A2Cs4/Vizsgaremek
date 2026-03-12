import React from "react";

function Price({ onFilterChange }) {
  const handleChange = (e) => {
    const value = e.target.value === "all" ? null : e.target.value;
    onFilterChange("price", value);
  };

  return (
    <div className="ml">
      <h2 className="sidebar-title price-title">Ár</h2>
      <div className="filter-selector">
        {[
          { value: "all", label: "Minden" },
          { value: "0 - 50 000 Ft", label: "0 - 50 000 Ft" },
          { value: "50 001 - 150 000 Ft", label: "50 001 - 150 000 Ft" },
          { value: "150 001 - 300 000 Ft", label: "150 001 - 300 000 Ft" },
          { value: "300 001 - 600 000 Ft", label: "300 001 - 600 000 Ft" },
          { value: "600 000 Ft felett", label: "600 000 Ft felett" },
        ].map(({ value, label }) => (
          <label key={value} className="sidebar-label-container">
            <input
              type="radio"
              name="price"
              value={value}
              defaultChecked={value === "all"}
              onChange={handleChange}
            />
            <span className="checkmark"></span>
            {label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Price;
