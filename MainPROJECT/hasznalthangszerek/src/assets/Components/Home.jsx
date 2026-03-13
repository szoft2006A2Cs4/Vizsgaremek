import "../../index.css";
import Nav from "./Nav";
import Introduction from "./Introduction";
import PseMain from "./pseMain";
import Drawer from "./CatDrawer";
import axios from "../scripts/axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../scripts/AuthProvider";
import CatField from "./CatField";

const instURL = "/api/Instrument";
const catURL = "/api/Category";

function Home() {
  const [instruments, setInstruments] = useState([]);
  const [scats, setCats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseIns = await axios.get(instURL, {
          withCredentials: true,
        });

        const responseCats = await axios.get(catURL, {
          withCredentials: true,
        });

        setCats(responseCats.data);
        setInstruments(responseIns.data);
        console.log(responseIns.data[0]);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchData();
  }, []);

  const { auth } = useContext(AuthContext);

  const loggedIn = !auth.user;

  return !loggedIn ? (
    <div>
      <Nav />
      <CatField cats={scats} />
      <PseMain data={instruments} />
    </div>
  ) : (
    <div>
      <Nav />
      <Introduction />
      <PseMain data={instruments} />
      <Drawer />
    </div>
  );
}

export default Home;
