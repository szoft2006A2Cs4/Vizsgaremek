import { useEffect, useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "../scripts/axios";
import { useContext } from "react";
import AuthContext from "../scripts/AuthProvider";
import { DataList } from "@chakra-ui/react";

export default function CheckOut({ user }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedInsId = searchParams.get("ins");

  const [isLoading, setIsLoading] = useState(false);
  const [ins, setIns] = useState(null);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) return navigate("/", { replace: true });
    setIsLoading(true);
    async function fetchData() {
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
  if (!user) return;
  return (
    <div id="checkOut-page-cont">
      {isLoading && <Loading />}
      <Nav />
      <div id="checkOut-content">
        <div id="checkOut-field">
          <h1>Pénztár</h1>
          <hr />
          <div id="checkOut-grid">
            <div id="checkOut-grid-first">
              <div>
                <h3 style={{ display: "flex", justifySelf: "start" }}>
                  Hangszer adatai
                </h3>
                <hr />
              </div>
              <DataList.Root orientation="horizontal">
                <DataList.Item>
                  <DataList.ItemLabel>Név</DataList.ItemLabel>
                  <DataList.ItemValue>{ins.name}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Kategória</DataList.ItemLabel>
                  <DataList.ItemValue>{ins.scName}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Állapot</DataList.ItemLabel>
                  <DataList.ItemValue>{ins.condition}</DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>

              <div>
                <h3 style={{ display: "flex", justifySelf: "start" }}>
                  Eladó adatai
                </h3>
                <hr />
              </div>

              <DataList.Root orientation="horizontal">
                <DataList.Item>
                  <DataList.ItemLabel>Név</DataList.ItemLabel>
                  <DataList.ItemValue>{ins.seller.name}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Minősítés</DataList.ItemLabel>
                  <DataList.ItemValue>{ins.seller.review}</DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>

              <div>
                <div id="checkOut-costField">
                  <h2>Ár</h2>
                  <h2>{ins.cost} HUF</h2>
                </div>
                <hr />
              </div>
            </div>

            <div id="checkOut-grid-sec">
              <h3>Az ön adatai</h3>
              <DataList.Root>
                <DataList.Item>
                  <DataList.ItemLabel>Név</DataList.ItemLabel>
                  <DataList.ItemValue>{user.name}</DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Cím</DataList.ItemLabel>
                  <DataList.ItemValue>
                    {user.city}, {user.streetHouseNumber}
                  </DataList.ItemValue>
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Email</DataList.ItemLabel>
                  <DataList.ItemValue>{user.email}</DataList.ItemValue>

                  <DataList.Item>
                    <DataList.ItemLabel>Telefonszám</DataList.ItemLabel>
                    <DataList.ItemValue>{user.phoneNumber}</DataList.ItemValue>
                  </DataList.Item>
                </DataList.Item>
              </DataList.Root>

              <div></div>

              <div id="checkOut-grid-sec-footer">
                <button className="uni-button-sm">Vásárlás</button>
                <button className="uni-button-sm">Mégsem</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
