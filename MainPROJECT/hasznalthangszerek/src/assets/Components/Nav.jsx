import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../scripts/AuthProvider";
import UserDropDown from "./UserDropDown";
import Avatar from "./Avatar";
import Drawer_ from "./CatDrawer";
import ForYou from "./ForYou";

export default function Nav({ cats, scats, loading }) {
  const { auth } = useContext(AuthContext);
  const [openProf, setOpenProf] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);

  const handleDrawer = () => {
    setIsDrawerOpen(true);
  };

  if (loading) return null;
  const loggedIn = !auth.user;

  return !loggedIn ? (
    <nav>
      <Link to="/" id="logo">
        <img
          id="logo-icon"
          src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770638077/logo_joyyt1.png"
        />
      </Link>

      <div id="nav-spacing-loggedIn">
        <SearchInput></SearchInput>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            height: "100%",
          }}
          onClick={() => {
            setIsForYouOpen(!isForYouOpen);
          }}
        >
          <img
            style={{ width: "3rem" }}
            src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1773988749/heart_vaax00.svg"
            id="ForYou-icon"
          />
        </div>

        <div className="avatar-drop-wrapper">
          <Avatar
            onClick={() => setOpenProf(!openProf)}
            src={
              "https://res.cloudinary.com/dknhbvrq9/image/upload/v1771170318/list-music_xwhp8v.svg"
            }
          />
          {openProf && <UserDropDown />}
        </div>
      </div>
      {isForYouOpen && <ForYou></ForYou>}
    </nav>
  ) : (
    <nav>
      <Link to="/" id="logo">
        <img
          id="logo-icon"
          src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770638077/logo_joyyt1.png"
        />
      </Link>

      <div id="nav-spacing">
        <button onClick={handleDrawer}>
          <a>Összes kategória</a>
        </button>

        <button type="button">
          <Link to="/aboutUs">Rólunk</Link>
        </button>

        <div id="nav-end">
          <SearchInput></SearchInput>

          <button>
            <Link to="/login">Bejelentkezés</Link>
          </button>
        </div>
      </div>

      <Drawer_
        open={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        catList={cats}
        scats={scats}
        loading={loading}
      />
    </nav>
  );
}
