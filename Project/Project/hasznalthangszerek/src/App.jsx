import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { runnerImport } from "vite";
import CarouselFrame from "./CarouselFrame";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarouselFrame />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
