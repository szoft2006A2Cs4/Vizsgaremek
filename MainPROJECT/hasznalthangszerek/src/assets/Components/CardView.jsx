import React from "react";
import Nav from "./Nav";
import axios from "axios";
import Sidebar from "./cardView/sidebar/Sidebar";
import Instruments from "./cardView/Instruments";

export default function CardView() {
  const [insList, setInsList] = React.useState([]);
  const INS_URL = "/api/Instrument";

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(INS_URL);
      setInsList(result.data);
    };
    fetchData();
  }, []);

  return (
    <div id="cardView">
      <Nav />
      <Sidebar />
      <Instruments />
    </div>
  );
}
