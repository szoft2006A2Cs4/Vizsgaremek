import { useEffect, useState } from "react";
import Footer from "./Footer";
import Nav from "./Nav";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import axios from "../scripts/axios";
import { useContext } from "react";
import AuthContext from "../scripts/AuthProvider";
import { DataList, Dialog, Portal } from "@chakra-ui/react";
import PaymentInputs from "./PaymentInputs";

export default function CheckOut({ user }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedInsId = searchParams.get("ins");

  const [isLoading, setIsLoading] = useState(false);
  const [ins, setIns] = useState(null);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [paymentSaved, setPaymentSaved] = useState(false);

  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.loading) return;
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

  const handlePaymentSave = () => {
    setPaymentSaved(true);
    setIsPaymentOpen(false);
  };

  if (!ins) return null;
  if (!user) return null;
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
                </DataList.Item>

                <DataList.Item>
                  <DataList.ItemLabel>Telefonszám</DataList.ItemLabel>
                  <DataList.ItemValue>{user.phoneNumber}</DataList.ItemValue>
                </DataList.Item>
              </DataList.Root>

              <div>
                <br />
                <button
                  className="uni-button-sm"
                  onClick={() => {
                    setIsPaymentOpen(true);
                    setPaymentData(false);
                  }}
                >
                  Vásárlási mód hozzáadása
                </button>
                <br />
                <br />
                {paymentSaved && (
                  <DataList.Root orientation="horizontal">
                    <DataList.Item gap="-96">
                      <DataList.ItemLabel>
                        <img src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1775311619/credit-card_issq6i.svg" />
                      </DataList.ItemLabel>
                      <DataList.ItemValue>
                        {paymentData.number
                          ? `**** **** **** ${paymentData.number.replace(/\s/g, "").slice(-4)}`
                          : ""}
                      </DataList.ItemValue>
                    </DataList.Item>
                  </DataList.Root>
                )}
              </div>

              <div id="checkOut-grid-sec-footer">
                <button className="uni-button-sm">Vásárlás</button>
                <button
                  className="uni-button-sm"
                  onClick={() =>
                    navigate(`/instruments?ins=${selectedInsId}`, {
                      replace: true,
                    })
                  }
                >
                  Mégsem
                </button>
              </div>
            </div>
          </div>

          <Dialog.Root
            open={isPaymentOpen}
            onOpenChange={(e) => setIsPaymentOpen(e.open)}
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.CloseTrigger />
                  <Dialog.Header>
                    <Dialog.Title fontSize="xl">
                      Fizetési mód hozzáadása
                    </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <PaymentInputs onChange={(data) => setPaymentData(data)} />
                  </Dialog.Body>
                  <Dialog.Footer>
                    <button
                      className="uni-button-sm"
                      onClick={() => setIsPaymentOpen(false)}
                    >
                      Mégsem
                    </button>
                    <button
                      className="uni-button-sm"
                      onClick={() => handlePaymentSave()}
                    >
                      Mentés
                    </button>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        </div>
      </div>
      <Footer />
    </div>
  );
}
