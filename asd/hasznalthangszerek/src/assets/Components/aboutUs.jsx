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
          <h2>Rólunk</h2>

          <h4>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
            incidunt, nobis commodi tempora pariatur placeat necessitatibus,
            debitis, eum molestiae cupiditate quos repudiandae repellat esse
            voluptatum quibusdam amet iusto quasi? Quia!
          </h4>
        </div>

        <div id="aboutUs-Creatortext">
          <AboutUsCard
            name="Czibók Bence"
            img="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770717706/czibi_v0d1hd.jpg"
          />
          <AboutUsCard
            name="Németh Balázs"
            img="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770717705/balazs_wvopjo.jpg"
          />
          <AboutUsCard
            name="Simon Dominik"
            img="https://res.cloudinary.com/dknhbvrq9/image/upload/v1770717707/B2517D2F-B470-4764-A85D-24C49023EFE9_1_105_c_cr7q8c.jpg"
          />
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
