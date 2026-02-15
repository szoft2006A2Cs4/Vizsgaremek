import React, { useContext } from "react";
import axios from "../scripts/axios";
import AuthContext from "../scripts/AuthProvider";

export default function UserDropDown() {
  const LOGOUT_URL = "api/login";
  const { setAuth } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      const response = await axios.delete(LOGOUT_URL, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err.response);
    } finally {
      setAuth({});
    }
  };

  return (
    <div className="UserDropDown">
      <p className="UserDropDown-icons-cont">
        <img src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1771170213/person-standing_ssdvpg.svg" />
        <a className="UserDropDown-Items">Fiókom</a>
      </p>
      <p
        className="UserDropDown-icons-cont Logout"
        style={{ marginTop: "10px" }}
        onClick={handleLogout}
      >
        <img src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1771021364/logout_lpacjr.svg" />
        <a className="UserDropDown-Items">Kilépés</a>
      </p>
    </div>
  );
}
