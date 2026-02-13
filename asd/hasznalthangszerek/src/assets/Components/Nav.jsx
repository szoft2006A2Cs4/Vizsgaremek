import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchInput from "./SearchInput";

export default function Nav({ logIn }) {
  return (
    <nav>
      <Link to="/" id="logo">
        <img
          id="logo-icon"
          src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770638077/logo_joyyt1.png"
        />
      </Link>

      <div id="nav-spacing">
        <button>
          <Link to="/allCaregories">Összes kategória</Link>
        </button>

        <button type="button">
          <Link to="/aboutUs">Rólunk</Link>
        </button>

        <div id="nav-bar">
          <SearchInput></SearchInput>
        </div>

        {!logIn ? (
          <button>
            <Link to="/login">Bejelentkezés</Link>
          </button>
        ) : (
          <button>
            <Link to="/login">nem</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
