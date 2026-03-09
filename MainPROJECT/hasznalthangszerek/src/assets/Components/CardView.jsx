import React from "react";
import Nav from "./Nav";
import axios from "../scripts/axios";
import Sidebar from "./cardView/Sidebar";
import Instruments from "./cardView/Instruments";
import { useState, useEffect } from "react";

const INS_URL = "/api/Instrument";

export default function CardView() {
  const [insList, setInsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(INS_URL, {
          withCredentials: true,
        });
        setInsList(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchData();
  }, []);

  return (
    <div id="cardView">
      <Nav />
      <div id="testClassField">
        <div style={{ gridColumn: 1 }}>
          <Sidebar />
        </div>
        <div style={{ gridColumn: 2 }}>
          <Instruments instruments={insList} />
        </div>
      </div>
    </div>
  );
}
