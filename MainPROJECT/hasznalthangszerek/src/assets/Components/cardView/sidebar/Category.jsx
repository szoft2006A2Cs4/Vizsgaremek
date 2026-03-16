import { useState, useEffect } from "react";
import axios from "../../../scripts/axios";

const SCAT_URL = "/api/Subcategory";

function Option({ category, selectedCategory, onSelect }) {
  return (
    <label className="sidebar-label-container">
      <input
        type="radio"
        name="category"
        checked={selectedCategory === category}
        onChange={() => onSelect(category)}
      />
      <span className="checkmark"></span>
      {category.split(" ")[0]}
    </label>
  );
}

function Subcategory({ subcategory, selectedSubcategory, onSelect }) {
  return (
    <label className="sidebar-label-container">
      <input
        type="radio"
        name="subcategory"
        checked={selectedSubcategory === subcategory.name}
        onChange={() => onSelect(subcategory.name)}
      />
      <span className="checkmark"></span>
      {subcategory.name.split(" ")[0]}
    </label>
  );
}

function Category({ categories, onFilterChange, filters }) {
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    filters?.category || null,
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    filters?.subcategory || null,
  );

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (!selectedCategory) {
        setSubcategories([]);
        return;
      }
      try {
        const response = await axios.get(SCAT_URL);
        const filtered = response.data.filter(
          (sub) => sub.cName === selectedCategory,
        );
        setSubcategories(filtered);
      } catch (err) {
        console.error("Alkategória betöltési hiba:", err);
      }
    };
    fetchSubcategories();
  }, [selectedCategory]);

  useEffect(() => {
    setSelectedCategory(filters?.category || null);
    setSelectedSubcategory(filters?.subcategory || null);
  }, [filters?.category, filters?.subcategory]);

  const handleCategorySelect = (name) => {
    setSelectedCategory(name);
    setSelectedSubcategory(null);
    onFilterChange("category", name);
  };

  const handleCategoryAll = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    onFilterChange("category", null);
  };

  const handleSubcategorySelect = (name) => {
    setSelectedSubcategory(name);
    onFilterChange("subcategory", name);
  };

  const handleSubcategoryAll = () => {
    setSelectedSubcategory(null);
    onFilterChange("subcategory", null);
  };

  return (
    <div>
      <h2 className="sidebar-title">Kategória</h2>
      <div className="filter-selector">
        <label className="sidebar-label-container">
          <input
            type="radio"
            name="category"
            checked={selectedCategory === null}
            onChange={handleCategoryAll}
          />
          <span className="checkmark"></span>Minden
        </label>
        {categories.map((category) => (
          <Option
            key={category}
            category={category}
            selectedCategory={selectedCategory}
            onSelect={handleCategorySelect}
          />
        ))}
      </div>

      <h2 className="sidebar-title">Alkategória</h2>
      <div className="filter-selector">
        {selectedCategory === null ? (
          <p className="sidebar-empty">Válassz kategóriát!</p>
        ) : (
          <>
            <label className="sidebar-label-container">
              <input
                type="radio"
                name="subcategory"
                checked={selectedSubcategory === null}
                onChange={handleSubcategoryAll}
              />
              <span className="checkmark"></span>Minden
            </label>
            {subcategories.map((subcategory) => (
              <Subcategory
                key={subcategory.name}
                subcategory={subcategory}
                selectedSubcategory={selectedSubcategory}
                onSelect={handleSubcategorySelect}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Category;
