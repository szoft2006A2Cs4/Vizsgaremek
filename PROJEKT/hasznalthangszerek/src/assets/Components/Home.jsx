import "../../index.css";
import Nav from "./Nav";
import Introduction from "./Introduction";
import PseMain from "./pseMain";
import Drawer from "./Drawer";
import axios from "../scripts/axios";
import { useState } from "react";

const instURL = "/api/Instrument";

function Home() {
  const [instruments, setInstruments] = useState([]);

  const handleGetCat = async () => {
    try {
      const response = await axios.get(instURL, {
        withCredentials: true,
      });
      console.log(response.data);
      setInstruments(response.data);
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <>
      <Nav />
      <Introduction />
      <PseMain data={instruments} func={handleGetCat()} />
      <Drawer />
    </>
  );
}

export default Home;
