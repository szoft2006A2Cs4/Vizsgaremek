import React, { useContext } from "react";
import axios from "../scripts/axios";
import AuthContext from "../scripts/AuthProvider";
import Loading from "./Loading";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserDropDown() {
  const LOGOUT_URL = "api/login";
  const { setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(LOGOUT_URL, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err.response);
    } finally {
      setAuth({});
      setIsLoading(false);
    }
  };

  let navigate = useNavigate();

  const handlePageRoutes = (route) => {
    navigate(route);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="UserDropDown">
          <p className="UserDropDown-icons-cont" id="MyProfile">
            <img src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1771170213/person-standing_ssdvpg.svg" />
            <a className="UserDropDown-Items">Fiókom</a>
          </p>
          <p
            className="UserDropDown-icons-cont"
            id="Logout"
            style={{ marginTop: "10px" }}
            onClick={handleLogout}
          >
            <img src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1771021364/logout_lpacjr.svg" />
            <a className="UserDropDown-Items">Kilépés</a>
          </p>
          <p
            className="UserDropDown-icons-cont"
            id="Upload"
            style={{ marginTop: "10px" }}
            onClick={() => {
              window.location.href = "/upLoad";
            }}
          >
            <img src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1771923483/upload_cdibf3.svg" />
            <a className="UserDropDown-Items">Új hirdetés</a>
          </p>
        </div>
      )}
    </>
  );
}
