import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext, useState } from "react";
import AuthContext from "../scripts/AuthProvider";
import UserDropDown from "./UserDropDown";
import Avatar from "./Avatar";
import Drawer_ from "./CatDrawer";
import axios from "../scripts/axios";

export default function Nav() {
  const { auth, loading } = useContext(AuthContext);
  const [openProf, setOpenProf] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const categoryURL = "api/Category";
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleGetCat = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(categoryURL, {
        withCredentials: true,
      });
      setCategories(response.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawer = () => {
    setIsDrawerOpen(true);
    if (categories.length === 0) {
      handleGetCat();
    }
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

      <div id="nav-spacing">
        <div id="nav-bar">
          <SearchInput></SearchInput>
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

        <div id="nav-bar">
          <SearchInput></SearchInput>
        </div>

        <button>
          <Link to="/login">Bejelentkezés</Link>
        </button>
      </div>

      <Drawer_
        open={isDrawerOpen}
        setOpen={setIsDrawerOpen}
        catList={categories}
        //isLoading={isLoading}
      />
    </nav>
  );
}
