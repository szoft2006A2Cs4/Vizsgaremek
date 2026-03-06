import React from "react";
import Nav from "./Nav";

export default function CardView() {
  return (
    <div id="cardView">
      <Nav />
      <Sidebar />
      <Instruments />
    </div>
  );
}
