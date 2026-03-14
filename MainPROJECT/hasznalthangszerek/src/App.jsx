import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
import Home from "./assets/Components/Home";
import AboutUs from "./assets/Components/aboutUs";
import UpLoad from "./assets/Components/UpLoad";
import Contact from "./assets/Components/Contact";
import CardView from "./assets/Components/CardView";
import { useEffect, useState } from "react";
import axios from "./assets/scripts/axios";
import Loading from "./assets/Components/Loading";

const cloudName = "dknhbvrq9";
const instURL = "/api/Instrument";
const catURL = "/api/Category";

function App() {
  const [instruments, setInstruments] = useState([]);
  const [scats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const responseIns = await axios.get(instURL, {
          withCredentials: true,
        });

        const responseCats = await axios.get(catURL, {
          withCredentials: true,
        });

        const insWithImgs = responseIns.data.map((ins) => {
          // console.log(ins);
          const cleanName = ins.name.split(" ").join("");
          const imageId = ins.seller.imageId;
          const count = ins.imageCount;

          let imgs = [];

          if (count > 0) {
            for (let i = 0; i < count; i++) {
              const publicId = `${cleanName}_${imageId}_${i}`;
              const encodedId = encodeURIComponent(publicId);
              imgs.push(
                `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${encodedId}.jpg`,
              );
            }
          }

          return {
            ...ins,
            imageUrls: imgs,
          };
        });

        setCats(responseCats.data);
        setInstruments(insWithImgs);
      } catch (err) {
        console.log(err.response);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                instruments={instruments}
                scats={scats}
                isLoading={isLoading}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/upLoad" element={<UpLoad />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route
            path="/instruments"
            element={<CardView data={instruments} loading={isLoading} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
