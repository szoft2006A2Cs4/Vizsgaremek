import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext } from "react";
import AuthContext from "../scripts/AuthProvider";

export default function Nav() {
  const { auth, loading } = useContext(AuthContext);
  if (loading) return null;
  const loggedIn = !auth.user;
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

        {!loggedIn ? (
          <p>Be vagy jelentkezve</p>
        ) : (
          <button>
            <Link to="/login">Bejelentkezés</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
