import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


export default function Footer() {
  return ( <footer>
    <section className="footer" >
      <hr className="footer-seperator" />
      <section className="footer-social-media" >
        <a href="https://www.instagram.com/hasznalthangszerek/">Social</a>
      </section>
      <section className="footer-info" >
        <section className="footer-info-left" >
          <section className="footer-info__email">
              hhproject67@gmail.com
          </section>
          <section className="footer-info__returns">
            Rólunk
            <br />
            Ide is
          </section>
        </section>
        <section className="footer-info-center">
          <section className="footer-info__name">
              Használt Hangszerek
          </section>
          <section className="footer-info__terms">
            Általános Szerződési Feltételek
            <br />
            Visszaküldési szabályzat
          </section>
        </section>
        <section className="footer-info-right">
          <section className="footer-info__number">
              06301234567
          </section>
          <section className="footer-info__contact">
            <Link to="/login">Bejelentkezés</Link>
            <br />
            <Link to="/register">Regisztrálás</Link>
          </section>
        </section>
        </section>
        <hr className="footer-seperator" />
        </section>
    </footer>
  )
}
