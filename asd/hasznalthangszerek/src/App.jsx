import { useState } from "react";
import "./index.css";
import Header from "./assets/Components/Header";
import Nav from "./assets/Components/Nav";
import Introduction from "./assets/Components/Introduction";
import PseMain from "./assets/Components/pseMain";
import Footer from "./assets/Components/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Nav />
      <Introduction />
      <PseMain />
      <Footer />
    </>
  );
}

export default App;
