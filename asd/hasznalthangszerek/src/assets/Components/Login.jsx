import { useRef, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../style/register.css";
import Register from "./Register";
import AuthContext from "../scripts/AuthProvider";
import axios from "../scripts/axios";

const LOGIN_URL = "api/Login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        Email: email,
        Password: pwd,
      };
      const response = await axios.post(LOGIN_URL, userData);
      console.log("Szerver válasza: ", response.data);
      const accessToken = response.data.accessToken;
      const roles = response.data.roles;
      setAuth({ email, pwd, roles, accessToken });
      setEmail("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err.response) {
        setErrMsg("A szerver nem válaszol!");
      } else if (err.response.status === 400) {
        setErrMsg("Hiányzó email cím vagy jelszó!");
      } else if (err.response.status === 404) {
        setErrMsg("Az alábbi adatokkal felhasználó nem található!");
      } else {
        setErrMsg("Bejelentkezés sikertelen!");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <div className="wrapper">
          <h1 id="successful">Sikeres bejelentkezés!</h1>
          <br />
          <p>
            <Link to="/">Vissza a főoldalra!</Link>
          </p>
        </div>
      ) : (
        <div className="wrapper">
          <h1>Bejelentkezés</h1>
          {/* <p id="error-message"></p> */}
          <p
            id="error-message"
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <center>
            <form id="signup-form" onSubmit={handleSubmit}>
              <div className="incorrect"></div>
              <div>
                <label htmlFor="email-input">
                  <span>@</span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email-input"
                  placeholder="Email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
              <div>
                <label htmlFor="password-input">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8e3eD"
                  >
                    <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm240-200q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80Z" />
                  </svg>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password-input"
                  placeholder="Jelszó"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                />
              </div>
              <button type="submit">Bejelentkezés</button>
            </form>
          </center>
          <p>
            Új itt? <Link to="/register">Regisztráció</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
