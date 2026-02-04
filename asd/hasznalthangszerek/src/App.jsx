import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./assets/components/Login";
import Home from "./assets/components/Home";

function App() {
  return (
    <>
      <BrowserRouter id="browserRouter">
        <Link to="/" className="browserRouter">
          Home
        </Link>
        <Link to="/login" className="browserRouter">
          Bejelentkezés
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
