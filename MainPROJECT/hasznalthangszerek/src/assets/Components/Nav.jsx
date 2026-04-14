import { Link } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext, useState, useEffect, useCallback, useRef } from "react";
import AuthContext from "../scripts/AuthProvider";
import UserDropDown from "./UserDropDown";
import Avatar from "./Avatar";
import Drawer_ from "./CatDrawer";
import ForYou from "./ForYou";
import { Box, Flex, IconButton, Separator, Text } from "@chakra-ui/react";

const HamburgerIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="4" y1="4" x2="20" y2="20" />
    <line x1="20" y1="4" x2="4" y2="20" />
  </svg>
);

export default function Nav({ cats, scats, loading, ins }) {
  const { auth } = useContext(AuthContext);
  const [openProf, setOpenProf] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isForYouOpen, setIsForYouOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia("(max-width: 1024px)").matches,
  );
  const menuRef = useRef(null);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleDrawer = () => setIsDrawerOpen(true);

  if (loading) return null;
  const loggedIn = !auth.user;

  // ─── Szendvicsgomb ────────────────────────────────────────────────
  const HamburgerButton = () => (
    <IconButton
      id="mobile-menu-btn"
      aria-label={menuOpen ? "Menü bezárása" : "Menü megnyitása"}
      aria-expanded={menuOpen}
      icon={menuOpen ? <CloseIcon /> : <HamburgerIcon />}
      onClick={toggleMenu}
      variant="unstyled"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="black"
      fontSize="1.25rem"
      flexShrink={0}
      _hover={{ color: "wheat" }}
    />
  );

  // ─── Egy menüpont ─────────────────────────────────────────────────
  const MobileMenuItem = ({ as: Tag = "button", label, icon, onClick, to }) => {
    const commonProps = {
      display: "flex",
      alignItems: "center",
      gap: 3,
      px: 2,
      py: 3,
      color: "#f5e6c8",
      bg: "transparent",
      border: "none",
      borderRadius: "md",
      fontSize: "md",
      fontFamily: "inherit",
      fontWeight: 400,
      textDecoration: "none",
      cursor: "pointer",
      width: "100%",
      textAlign: "left",
      transition: "background 150ms ease",
      _hover: { bg: "whiteAlpha.200" },
    };

    if (Tag === Link) {
      return (
        <Box as={Link} to={to} onClick={onClick} {...commonProps}>
          <Text as="span" fontSize="lg" w="6" textAlign="center">
            {icon}
          </Text>
          {label}
        </Box>
      );
    }

    return (
      <Box as="button" onClick={onClick} {...commonProps}>
        <Text as="span" fontSize="lg" w="6" textAlign="center">
          {icon}
        </Text>
        {label}
      </Box>
    );
  };

  // ─── Mobil menüpanel ──────────────────────────────────────────────
  const MobileMenu = ({ isLoggedIn }) => (
    <>
      {/* Overlay */}
      <Box
        position="fixed"
        inset={0}
        bg="blackAlpha.500"
        zIndex={98}
        onClick={closeMenu}
      />

      {/* Panel */}
      <Flex
        ref={menuRef}
        position="fixed"
        top={0}
        right={0}
        width="min(75vw, 18rem)"
        height="100dvh"
        bg="#77625c"
        zIndex={99}
        flexDirection="column"
        p={5}
        gap={1}
        boxShadow="-4px 0 20px rgba(0,0,0,0.25)"
        overflowY="auto"
      >
        {/* Bezáró gomb */}
        <IconButton
          aria-label="Menü bezárása"
          icon={<CloseIcon />}
          onClick={closeMenu}
          alignSelf="flex-end"
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          color="white"
          mb={4}
          _hover={{ color: "wheat" }}
        />

        {isLoggedIn ? (
          <>
            <MobileMenuItem
              onClick={() => {
                setIsForYouOpen(true);
                closeMenu();
              }}
              icon="♡"
              label="Neked ajánljuk"
            />
            <Separator borderColor="whiteAlpha.300" my={1} />
            <MobileMenuItem
              as={Link}
              to="/profile"
              onClick={closeMenu}
              icon="👤"
              label="Fiókom"
            />
            <MobileMenuItem
              as={Link}
              to="/upload"
              onClick={closeMenu}
              icon="⬆"
              label="Hirdetés feladása"
            />
            <Separator borderColor="whiteAlpha.300" my={1} />
            <MobileMenuItem
              as={Link}
              to="/aboutUs"
              onClick={closeMenu}
              icon="ℹ"
              label="Rólunk"
            />
            <MobileMenuItem
              as={Link}
              to="/contact"
              onClick={closeMenu}
              icon="✉"
              label="Kapcsolat"
            />
            <Separator borderColor="whiteAlpha.300" my={1} />
            <MobileMenuItem
              onClick={() => {
                handleDrawer();
                closeMenu();
              }}
              icon="☰"
              label="Összes kategória"
            />
          </>
        ) : (
          <>
            <MobileMenuItem
              as={Link}
              to="/login"
              onClick={closeMenu}
              icon="→"
              label="Bejelentkezés"
            />
            <MobileMenuItem
              as={Link}
              to="/aboutUs"
              onClick={closeMenu}
              icon="ℹ"
              label="Rólunk"
            />
            <MobileMenuItem
              as={Link}
              to="/contact"
              onClick={closeMenu}
              icon="✉"
              label="Kapcsolat"
            />
            <Separator borderColor="whiteAlpha.300" my={1} />
            <MobileMenuItem
              onClick={() => {
                handleDrawer();
                closeMenu();
              }}
              icon="☰"
              label="Összes kategória"
            />
          </>
        )}
      </Flex>
    </>
  );

  // ─── Render ───────────────────────────────────────────────────────
  return !loggedIn ? (
    // ════ BEJELENTKEZETT ════
    <nav>
      <Link to="/" id="logo">
        <img
          id="logo-icon"
          src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770638077/logo_joyyt1.png"
        />
      </Link>

      {/* Asztali nav */}
      {!isMobile && (
        <div id="nav-spacing-loggedIn">
          <SearchInput ins={ins} />
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

      {/* Mobil nav */}
      {isMobile && (
        <div id="phone">
          <Box id="mobile-search" flex={1}>
            <SearchInput ins={ins} />
          </Box>
          <HamburgerButton />
        </div>
      )}

      {menuOpen && <MobileMenu isLoggedIn={true} />}

      {isForYouOpen && (
        <ForYou open={isForYouOpen} onClose={() => setIsForYouOpen(false)} />
      )}
    </nav>
  ) : (
    // ════ KIJELENTKEZETT ════
    <nav>
      <Link to="/" id="logo">
        <img
          id="logo-icon"
          src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770638077/logo_joyyt1.png"
        />
      </Link>

      {/* Asztali nav */}
      {!isMobile && (
        <div id="nav-spacing">
          <button onClick={handleDrawer}>
            <a>Összes kategória</a>
          </button>
          <button type="button">
            <Link to="/aboutUs">Rólunk</Link>
          </button>
          <div id="nav-end">
            <SearchInput ins={ins} />
            <button>
              <Link to="/login">Bejelentkezés</Link>
            </button>
          </div>
        </div>
      )}

      {/* Mobil nav */}
      {isMobile && (
        <div id="phone">
          <Box id="mobile-search" flex={1}>
            <SearchInput ins={ins} />
          </Box>
          <HamburgerButton />
        </div>
      )}

      {menuOpen && <MobileMenu isLoggedIn={false} />}

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
