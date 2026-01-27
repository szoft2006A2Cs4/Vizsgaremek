import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style/index.css";
import CarouselFrame from "./CarouselFrame";

createRoot(document.getElementById("carouselPlacement")).render(
  <StrictMode>
    <CarouselFrame />
  </StrictMode>,
);
