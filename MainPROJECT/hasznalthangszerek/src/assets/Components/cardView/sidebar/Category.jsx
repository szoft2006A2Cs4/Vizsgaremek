import React from "react";

function Category() {
  return (
    <div>
      <h2 className="sidebar-title">Kategória</h2>

      <div>
        <label className="sidebar-label-container">
          <input type="radio" name="all" />
          <span className="checkmark"></span>Minden
        </label>
        {/* Kategóriák lekérdezése + rádiógombok készítése */}
      </div>
    </div>
  );
}

export default Category;
