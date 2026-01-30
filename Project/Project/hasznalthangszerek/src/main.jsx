import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style/index.css";
import CarouselFrame from "./CarouselFrame";
import Login from "./Login";
import App from "./App";

createRoot(document.getElementById("carouselPlacement")).render(
  <StrictMode>
    <App></App>
  </StrictMode>,
);
