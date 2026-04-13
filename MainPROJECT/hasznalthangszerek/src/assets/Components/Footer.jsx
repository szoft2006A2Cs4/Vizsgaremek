import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";

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

          <p onClick={() => setisOpen(true)} id="footer-aSzF">
            Adatkezelési Tájékoztató
          </p>
          <p>Visszaküldési szabályzat</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Használt Hangszerek – Minden jog fenntartva
      </div>
      <Dialog.Root open={isOpen} onOpenChange={(e) => setisOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />
              <Dialog.Header justifyContent="center">
                <Dialog.Title fontSize="xl">Adatkezelési Tájékoztató</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body fontSize="large">
<h4>1. Az Adatkezelő adatai:</h4>
•	Név/Cégnév: Használt Hangszerek
•	Székhely/Lakcím: Szombathely
•	E-mail cím: hasznalthangszerek01@gmail.com
•	Honlap: használthangszerek.hu
<h4>2. A kezelt adatok köre és az adatkezelés célja:</h4>
A weboldal látogatása során az alábbi esetekben történik adatkezelés:
•	Kapcsolatfelvételi űrlap: Ha üzenetet küldesz, a megadott nevet és e-mail címet kizárólag a válaszadáshoz használom fel.
•	Sütik (Cookies): A honlap technikai okokból és statisztikai célból (pl. Google Analytics) apró adatfájlokat helyezhet el a gépeden.
<h4>3. Az adatkezelés jogalapja:</h4>
Az adatkezelés a felhasználó önkéntes hozzájárulásán alapul (GDPR 6. cikk (1) bek. a) pont). Az űrlap kitöltésével és az üzenet elküldésével hozzájárulsz az adatok kezeléséhez.
<h4>4. Az adatkezelés időtartama:</h4>
A megadott adatokat a cél megvalósulásáig (pl. a kérdés megválaszolásáig) vagy a hozzájárulás visszavonásáig tárolom.
<h4>5. Adatfeldolgozók (Tárhelyszolgáltató):</h4>
Az adatokat biztonságos szervereken tároljuk. Tárhelyszolgáltatónk:
•	aiven.io, Helsinki , Finland(HQ) Antinkatu 1., sales@aiven.io
<h4>6. Az érintettek jogai:</h4>
Neked, mint látogatónak, jogod van:
•	Tájékoztatást kérni az adataid kezeléséről.
•	Kérni az adataid helyesbítését vagy törlését.
•	Tiltakozni az adatkezelés ellen.
<h4>7. Jogorvoslati lehetőség:</h4>
Bármilyen adatvédelmi panasszal a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) fordulhatsz:
•	Web: www.naih.hu
•	Cím: 1055 Budapest, Falk Miksa utca 9-11.
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </footer>
  );
}
