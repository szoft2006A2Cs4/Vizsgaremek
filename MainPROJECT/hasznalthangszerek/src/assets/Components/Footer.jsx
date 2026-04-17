import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { useState } from "react";
import ASzF from "./ASzF";

export default function Footer() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Kapcsolat</h3>
          <Link to="/contactUs">hasznalthangszerek01@gmail.com</Link>
          <p>06301234567</p>
          <a
            href="https://www.instagram.com/hasznalthangszerek/"
            target="_blank"
            className="social-link"
          >
            <FaInstagram className="social-icon" /> Instagram
          </a>
        </div>

        <div className="footer-column center">
          <h2 className="footer-logo">Használt Hangszerek</h2>
          <p>Kiváló minőségű hangszerek kedvező áron</p>
          <Link to="/login">Bejelentkezés</Link>
          <Link to="/register">Regisztráció</Link>
        </div>

        <div className="footer-column">
          <h3>Információ</h3>

          <p onClick={() => setisOpen(true)} id="footer-aszf">
            Adatkezelési tájékoztató
          </p>
          <p>Visszaküldési szabályzat</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Használt Hangszerek – Minden jog fenntartva
      </div>

      <ASzF value={isOpen} setter={setisOpen} />
    </footer>
  );
}
