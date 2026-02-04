import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
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
        <Link to="/register" className="browserRouter">
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
