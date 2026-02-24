import "../../index.css";
import Nav from "./Nav";
import Introduction from "./Introduction";
import PseMain from "./pseMain";
import Drawer from "./Drawer";
import axios from "../scripts/axios";
import { useEffect, useState } from "react";

const instURL = "/api/Instrument";

function Home() {
  const [instruments, setInstruments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(instURL, {
          withCredentials: true,
        });
        console.log(response.data);
        setInstruments(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Nav />
      <Introduction />
      <PseMain data={instruments} />
      <Drawer />
    </>
  );
}

export default Home;
