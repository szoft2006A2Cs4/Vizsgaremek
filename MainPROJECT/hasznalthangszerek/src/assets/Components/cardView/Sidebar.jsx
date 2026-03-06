import React from "react";
import Category from "./sidebar/Category";
import Subcategory from "./sidebar/Subcategory";
import Price from "./sidebar/Price";
import Condition from "./sidebar/Condition";

function Sidebar() {
  return (
    <>
      <section className="sidebar">
        <Category />
        <Subcategory />
        <Price />
        <Condition />
      </section>
    </>
  );
}

export default Sidebar;
