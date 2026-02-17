import Nav from "./Nav";
import Footer from "./Footer";
import AboutUsCard from "./aboutUsCard";
import "../../index.css";

export default function AboutUs() {
  return (
    <div id="aboutUs">
      <Nav></Nav>
      <div id="aboutUs-main">
        <div id="aboutUs-Introtext">
          <h1>Rólunk</h1>

          <h3>
            Üdvözlünk nálunk! Weboldalunk ötlete egy egyszerű, de bosszantó
            problémából született: egyik csapattársunk hiába keresett egy
            megbízható, kifejezetten használt hangszerekre szakosodott
            platformot, nem talált olyat, ami minden igényt kielégített volna.
            Ekkor döntöttünk úgy, hogy a saját kezünkbe vesszük az irányítást.
            Célunk, hogy egy olyan közösségi teret hozzunk létre, ahol a
            hangszerek gazdát cserélhetnek, és ahol minden zenész – a kezdőtől a
            profiig – megtalálhatja következő kedvenc darabját.
          </h3>
        </div>

        <div id="aboutUs-Creatortext">
          <AboutUsCard
            name="Czibók Bence"
            img="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770717706/czibi_v0d1hd.jpg"
            subTitle="Cigány"
          />
          <AboutUsCard
            name="Németh Balázs"
            img="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770717705/balazs_wvopjo.jpg"
            subTitle="BodzaSzörpötIvó"
          />
          <AboutUsCard
            name="Simon Dominik"
            img="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770717707/B2517D2F-B470-4764-A85D-24C49023EFE9_1_105_c_cr7q8c.jpg"
            subTitle="ÉlőSoundboard"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
