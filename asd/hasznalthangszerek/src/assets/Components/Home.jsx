import "../../index.css";
import Nav from "./Nav";
import Introduction from "./Introduction";
import PseMain from "./pseMain";

function Home() {
  return (
    <>
      <Nav logIn={false} />
      <Introduction />
      <PseMain />
    </>
  );
}

export default Home;
