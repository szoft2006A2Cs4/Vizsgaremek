import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
import Home from "./assets/Components/Home";
import AboutUs from "./assets/Components/aboutUs";
import UpLoad from "./assets/Components/UpLoad";
import Contact from "./assets/Components/Contact";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/allCaregories" element={<></>} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/upLoad" element={<UpLoad />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route path="/instruments" element={<CardView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
