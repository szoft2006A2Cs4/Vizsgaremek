import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-column">
          <h3>Kapcsolat</h3>
          <p>hhproject67@gmail.com</p>
          <p>06301234567</p>
          <a href="https://www.instagram.com/hasznalthangszerek/" target="_blank" className="social-link">
          
          <FaInstagram className="social-icon" /> Instagram</a>
        </div>

        <div className="footer-column center">
          <h2 className="footer-logo">Használt Hangszerek</h2>
          <p>Kiváló minőségű hangszerek kedvező áron</p>
          <Link to="/login">Bejelentkezés</Link>
          <Link to="/register">Regisztráció</Link>
        </div>

        <div className="footer-column">
          <h3>Információ</h3>
          
          <p>Általános Szerződési Feltételek</p>
          <p>Visszaküldési szabályzat</p>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Használt Hangszerek – Minden jog fenntartva
      </div>
    </footer>
  );
}