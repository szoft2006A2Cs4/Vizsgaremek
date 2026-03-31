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
        const resp = axios.get(`/api/Instrument/${selectedInsId}`, {
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

  console.log(ins);
  return (
    <div id="checkOut-page-cont">
      {isLoading && <Loading />}
      <Nav />
      <div id="checkOut-content">
        <div id="checkOut-field">
          <h1>Pénztár</h1>
        </div>
      </div>
      <Footer />
    </div>
  );
}
