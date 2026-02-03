import search from "../img/search_icon.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "../../App";
import Login from "./Login";

export default function Nav() {
  return (
    <BrowserRouter>
      <nav>
        {/* <Link to="/">Home</Link> */}
        <Link to="/login">Bejelentkezés</Link>
      </nav>

      <Routes>
        {/* <Route path="/" element={<App />} />*/}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
