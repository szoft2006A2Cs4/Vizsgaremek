import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
import Home from "./assets/components/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Link to="/" className="Links">
          Home
        </Link>
        <Link to="/login" className="Links">
          Bejelentkezés
        </Link>
        <Link to="/register" className="Links">
          Regisztráció
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
