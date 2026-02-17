import "../../index.css";
import Nav from "./Nav";
import Introduction from "./Introduction";
import PseMain from "./pseMain";
import Drawer from "./Drawer";

function Home() {
  return (
    <>
      <Nav />
      <Introduction />
      <PseMain />
      <Drawer />
    </>
  );
}

export default Home;
