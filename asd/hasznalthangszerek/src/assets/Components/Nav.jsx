import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext, useState } from "react";
import AuthContext from "../scripts/AuthProvider";
import UserDropDown from "./UserDropDown";
import Avatar from "./Avatar";

export default function Nav() {
  const { auth, loading } = useContext(AuthContext);
  const [openProf, setOpenProf] = useState(false);
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
          <>
            <Avatar
              onClick={() => setOpenProf(!openProf)}
              src={
                "https://res.cloudinary.com/dknhbvrq9/image/upload/v1771170318/list-music_xwhp8v.svg"
              }
            />
            {openProf && <UserDropDown />}
          </>
        ) : (
          <button>
            <Link to="/login">Bejelentkezés</Link>
          </button>
        )}
      </div>
    </nav>
  );
}
