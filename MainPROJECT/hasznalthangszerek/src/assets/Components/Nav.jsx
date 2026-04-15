import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../scripts/AuthProvider";
import UserDropDown from "./UserDropDown";
import Avatar from "./Avatar";
import Drawer_ from "./CatDrawer";
import ForYou from "./ForYou";
import axios from "axios";
import {
  Box,
  Flex,
  Drawer,
  Button,
  Portal,
  CloseButton,
} from "@chakra-ui/react";

export default function Nav({ cats, scats, loading, ins }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [openProf, setOpenProf] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const LOGOUT_URL = "api/login";

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleDrawer = () => setIsDrawerOpen(true);

  if (loading) return null;
  const loggedIn = !auth.user;

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.delete(LOGOUT_URL, { withCredentials: true });
    } catch (err) {
      console.log(err.response);
    } finally {
      setAuth({});
      setIsLoading(false);
    }
  };

  const MobileMenu = ({ isLoggedIn }) => (
    <Drawer.Root open={menuOpen} onOpenChange={(e) => setMenuOpen(e.open)}>
      <Drawer.Trigger asChild>
        <Button variant="outline" size="sm">
          <img
            src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1771170318/list-music_xwhp8v.svg"
            style={{ height: "4.5vh" }}
          />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="4">
          <Drawer.Content rounded="md">
            <Drawer.Body bg="#77625c">
              <div id="mobile-menu-div">
                {isLoggedIn ? (
                  <>
                    <Link to="/profile">Fiókom</Link>
                    <Link to="/upLoad">Feltöltés</Link>
                    <p
                      className="UserDropDown-icons-cont"
                      id="Logout"
                      style={{ marginTop: "10px" }}
                      onClick={handleLogout}
                    >
                      <a className="UserDropDown-Items">Kilépés</a>
                    </p>
                  </>
                ) : (
                  <Link to="/login">Bejelentkezés</Link>
                )}
                <Link to="/aboutUs">Rólunk</Link>
                <Link to="/contactUs">Üzenj nekünk!</Link>
                <p
                  onClick={() => {
                    setMenuOpen(false);
                    handleDrawer();
                  }}
                >
                  Összes kategória
                </p>
              </div>
            </Drawer.Body>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );

  return !loggedIn ? (
    <nav>
      <Link to="/" id="logo">
        <img
          id="logo-icon"
          src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770638077/logo_joyyt1.png"
        />
      </Link>

      {!isMobile && (
        <div id="nav-spacing-loggedIn">
          <SearchInput ins={ins} isMobile={isMobile} />
          <Flex
            justify="center"
            align="center"
            h="100%"
            onClick={() => setIsForYouOpen(!isForYouOpen)}
            cursor="pointer"
          >
            <img
              style={{ width: "3rem" }}
              src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1773988749/heart_vaax00.svg"
              id="ForYou-icon"
            />
          </Flex>
          <div className="avatar-drop-wrapper">
            <Avatar
              onClick={() => setOpenProf(!openProf)}
              src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1771170318/list-music_xwhp8v.svg"
            />
            {openProf && <UserDropDown />}
          </div>
        </div>
      )}

      {isMobile && (
        <div id="phone">
          <Box id="mobile-search" flex={1}>
            <SearchInput ins={ins} isMobile={isMobile} />
          </Box>
        </div>
      )}

      {isMobile && <MobileMenu isLoggedIn={true} />}

      {isForYouOpen && (
        <ForYou open={isForYouOpen} onClose={() => setIsForYouOpen(false)} />
      )}
    </nav>
  ) : (
    <nav>
      <Link to="/" id="logo">
        <img
          id="logo-icon"
          src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770638077/logo_joyyt1.png"
        />
      </Link>

      {!isMobile && (
        <div id="nav-spacing">
          <button onClick={handleDrawer}>
            <a>Összes kategória</a>
          </button>
          <button type="button">
            <Link to="/aboutUs">Rólunk</Link>
          </button>
          <div id="nav-end">
            <SearchInput ins={ins} isMobile={isMobile} />
            <button>
              <Link to="/login">Bejelentkezés</Link>
            </button>
          </div>
        </div>
      )}

      {isMobile && (
        <div id="phone">
          <Box id="mobile-search" flex={1}>
            <SearchInput ins={ins} isMobile={isMobile} />
          </Box>
        </div>
      )}

      {isMobile && <MobileMenu isLoggedIn={false} />}

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
