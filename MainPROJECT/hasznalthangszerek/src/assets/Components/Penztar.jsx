import { useEffect, useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import axios from "../scripts/axios";

export default function CheckOut() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedInsId = searchParams.get("ins");

  const [isLoading, setIsLoading] = useState(false);
  const [ins, setIns] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const resp = await axios.get(`/api/Instrument/${selectedInsId}`, {
          withCredentials: true,
        });
        setIns(resp.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (!ins) return;

  return (
    <div id="checkOut-page-cont">
      {isLoading && <Loading />}
      <Nav />
      <div id="checkOut-content">
        <div id="checkOut-field">
          <h1>Pénztár</h1>
          <div id="checkOut-field-grid">
            <div id="checkOut-field-grid-first">
              <div className="checkOut-field-grid-elements">
                <h3>Név: </h3>
                <h3>{ins.name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
