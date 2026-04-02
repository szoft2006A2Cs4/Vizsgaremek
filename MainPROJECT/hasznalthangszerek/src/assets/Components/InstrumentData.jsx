import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import {
  Carousel,
  IconButton,
  Box,
  Image,
  DataList,
  AspectRatio,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import SimpleMap from "./simpleMap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../scripts/AuthProvider";

const InstrumentData = ({ instrument }) => {
  const images = instrument.imageUrls;
  const { auth } = useContext(AuthContext);
  const [BuyNowIsLogIn, setBuyNowIsLogIn] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    if (!auth.user) return setBuyNowIsLogIn(true);
    else navigate(`/checkOut?ins=${instrument.id}`, { replace: true });
  };

  if (instrument == null) return null;
  return (
    <div>
      <Nav />
      <div id="data-field">
        <div id="image-field">
          <Carousel.Root slideCount={images.length} padding="1rem">
            <Carousel.ItemGroup>
              {images.map((img, index) => (
                <Carousel.Item key={index} index={index}>
                  <Box rounded="lg" fontSize="2.5rem">
                    <AspectRatio ratio={16 / 9} width="100%">
                      <Image
                        src={img}
                        objectFit="cover"
                        width="100%"
                        height="500px"
                      />
                    </AspectRatio>
                  </Box>
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>

            <Carousel.Control justifyContent="center" gap="4">
              <Carousel.PrevTrigger asChild>
                <IconButton size="xs" variant="ghost">
                  <LuChevronLeft />
                </IconButton>
              </Carousel.PrevTrigger>

              <Carousel.Indicators />

              <Carousel.NextTrigger asChild>
                <IconButton size="xs" variant="ghost">
                  <LuChevronRight />
                </IconButton>
              </Carousel.NextTrigger>
            </Carousel.Control>
          </Carousel.Root>
          <section className="card" id="seller-card">
            <div className="card-details">
              <h3 className="card-title" id="seller-details">
                {instrument.name}
              </h3>
              <section className="card-price" id="card-price">
                <div className="details">
                  <div className="price" id="price">
                    {instrument.cost} HUF
                  </div>
                  <div className="seller" id="seller">
                    {instrument.seller.name}
                  </div>
                  <div className="seller" id="seller" fontSize={20}>
                    +{instrument.seller.phoneNumber}
                  </div>
                  <button className="uni-button" onClick={() => handleBuyNow()}>
                    Vásárlás most
                  </button>
                  <button className="uni-button">Ajánlattétel</button>
                </div>
              </section>
            </div>
          </section>
        </div>
        <div id="description-field">
          <p id="description">{instrument.description}</p>
          <div id="detail-grid">
            <DataList.Root orientation="horizontal" id="datalist-field">
              <DataList.Item>
                <DataList.ItemLabel className="datalist-item">
                  Kategória
                </DataList.ItemLabel>
                <DataList.ItemValue className="datalist-item">
                  {instrument.subCategory.cName}
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel className="datalist-item">
                  Alkategória
                </DataList.ItemLabel>
                <DataList.ItemValue className="datalist-item">
                  {instrument.scName}
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel className="datalist-item">
                  Állapot
                </DataList.ItemLabel>
                <DataList.ItemValue className="datalist-item">
                  {instrument.condition}
                </DataList.ItemValue>
              </DataList.Item>
              <DataList.Item>
                <DataList.ItemLabel className="datalist-item">
                  Termék helyszíne
                </DataList.ItemLabel>
                <DataList.ItemValue className="datalist-item">
                  {instrument.seller.postalCode}, {instrument.seller.city},{" "}
                  {instrument.seller.streetHouseNumber}
                </DataList.ItemValue>
              </DataList.Item>
            </DataList.Root>
            <div className="map-field">
              <SimpleMap
                postalCode={instrument.seller.postalCode}
                city={instrument.seller.city}
                address={instrument.seller.streetHouseNumber}
              />
            </div>
          </div>
        </div>

        {BuyNowIsLogIn && (
          <Dialog.Root
            open={BuyNowIsLogIn}
            onOpenChange={(e) => setBuyNowIsLogIn(e.open)}
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.CloseTrigger />
                  <Dialog.Header justifyContent="center">
                    <Dialog.Title fontSize="xl">
                      Vásárolni szeretnél? <br /> A biztonságos eladás és
                      vásárlás érdekében jelentkezzbe!
                    </Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body fontSize="large">
                    <div>
                      <button className="uni-button-sm">
                        <Link to={`/login`}>Bejelentkezés</Link>
                      </button>
                      <br />
                      <br />
                      <p>
                        Nincs még felhasználód? <br />
                        <Link to={`/register`}>Regisztrálj itt!</Link>
                      </p>
                    </div>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default InstrumentData;
