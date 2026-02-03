import { useState } from "react";
import "./index.css";
import Header from "./assets/Components/Header";
import Nav from "./assets/Components/Nav";
import Introduction from "./assets/Components/Introduction";
import pseMain from "./assets/Components/pseMain";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Nav />
      <Introduction />
      <pseMain />
    </>
  );
}

export default App;
