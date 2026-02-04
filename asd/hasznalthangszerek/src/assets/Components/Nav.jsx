import search from "../img/search_icon.png";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App from "../../App";
import Login from "./Login";

export default function Nav() {
  return (
    <nav>
      <button type="button">menu1</button>
      <button type="button">menu2</button>
      <button type="button">menu3</button>
      <button type="button">menu4</button>
      <span id="nav-bar">
        <input type="text" name="search" id="search" />
        <img src="pictures/search_icon.png" alt="search_icon" />
      </span>
      <button>
        <Link to="/login">Bejelentkezés</Link>
      </button>
    </nav>
  );
}
