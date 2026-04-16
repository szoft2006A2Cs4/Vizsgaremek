import "./index.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./assets/Components/Login";
import Register from "./assets/Components/Register";
import Home from "./assets/Components/Home";
import AboutUs from "./assets/Components/aboutUs";
import UpLoad from "./assets/Components/UpLoad";
import Contact from "./assets/Components/Contact";
import CardView from "./assets/Components/CardView";
import { useEffect, useState, useContext } from "react";
import axios from "./assets/scripts/axios";
import Loading from "./assets/Components/Loading";
import ForgottenPassword from "./assets/Components/forgottenPassword";
import Profile from "./assets/Components/Profile";
import AuthContext from "./assets/scripts/AuthProvider";
import ResetPWD from "./assets/Components/ResetPassword";
import CheckOut from "./assets/Components/Penztar";

const cloudName = "dknhbvrq9";
const instURL = "/api/Instrument";
const scatURL = "/api/Subcategory";

function App() {
  const [instruments, setInstruments] = useState([]);
  const [cats, setCats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scats, setSCats] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const responseIns = await axios.get(instURL, {
          withCredentials: true,
        });

        const responseSCats = await axios.get(scatURL, {
          withCredentials: true,
        });

        if (auth.user) {
          const responseCurrent = await axios.get(`/api/User/${auth.user}`);
          setCurrentUser(responseCurrent.data);
        }

        const insWithImgs = responseIns.data.map((ins) => {
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

        const categories = new Set(responseSCats.data.map((c) => c.cName));

        setSCats(responseSCats.data);
        setCats(categories);
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
                cats={cats}
                isLoading={isLoading}
                scats={scats}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/aboutUs"
            element={
              <AboutUs
                ins={instruments}
                cats={cats}
                scats={scats}
                loading={isLoading}
              />
            }
          />
          <Route path="/upLoad" element={<UpLoad />} />
          <Route path="/contactUs" element={<Contact />} />
          <Route
            path="/instruments"
            element={
              <CardView
                data={instruments}
                loading={isLoading}
                subcatList={scats}
                cats={cats}
                user={currentUser}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                mainLoading={isLoading}
                cat={cats}
                scat={scats}
                ins={instruments}
              />
            }
          />
          <Route path="/forgotPassword" element={<ForgottenPassword />} />
          <Route path="/resetPWD" element={<ResetPWD />} />
          <Route path="checkOut" element={<CheckOut user={currentUser} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
