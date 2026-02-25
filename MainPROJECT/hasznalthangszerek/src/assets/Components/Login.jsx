import { useRef, useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../style/register.css";
import AuthContext from "../scripts/AuthProvider";
import axios from "../scripts/axios";
import Loading from "./Loading";

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const LOGIN_URL = "api/Login";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    const emailInput = document.getElementById("email-input");
    const pwdInput = document.getElementById("password-input");
    const submitButton = document.getElementById("submit-button");
    e.preventDefault();

    if (email === "" || email == null) {
      setErrMsg("Hiba történt: Az email szükséges!");
      //errors++;
      emailInput.parentElement.classList.add("incorrect");
      return;
    } else if (!email.match(EMAIL_REGEX)) {
      setErrMsg("Nem megfelelő email cím formátum!");
      //errors++;
      emailInput.parentElement.classList.add("incorrect");
      return;
    } else if (pwd === "" || pwd == null) {
      setErrMsg("Hiba: A jelszó szükséges!");
      //errors++;
      pwdInput.parentElement.classList.add("incorrect");
      return;
    }

    // emailInput.setAttribute("disabled", true);
    // pwdInput.setAttribute("disabled", true);
    // submitButton.setAttribute("disabled", true);
    setIsLoading(true);

    try {
      const userData = {
        Email: email,
        Password: pwd,
      };
      const response = await axios.post(LOGIN_URL, userData, {
        withCredentials: true,
      });

      console.log("Szerver válasza: ", response.data);
      const roles = response.data.roles;
      setAuth({ user: email, roles });
      setEmail("");
      setPwd("");
      setSuccess(true);
      navigate("/", { replace: true });
    } catch (err) {
      if (!err.response) {
        setErrMsg("Hiba: A szerver nem válaszol!");
      } else if (err.response?.status === 400) {
        setErrMsg("Hiba: Hiányzó email cím vagy jelszó!");
      } else if (err.response?.status === 404) {
        setErrMsg("Hiba: A megadott adatokkal felhasználó nem található!");
      } else if (err.response?.status === 401) {
        setErrMsg("Hiba: A megadott adatokkal felhasználó nem található!");
      } else {
        setErrMsg("Hiba: Bejelentkezés sikertelen!");
      }
      errRef.current.focus();
    } finally {
      setIsLoading(false);
    }
  };

  function setIncorrectClass() {
    const emailInput = document.getElementById("email-input");
    const pwdInput = document.getElementById("password-input");
    const allInputs = [emailInput, pwdInput];

    allInputs.forEach((input) => {
      if (input.parentElement.classList.contains("incorrect")) {
        input.parentElement.classList.remove("incorrect");
      }
    });
  }

  function showPassword() {
    let x = document.getElementById("password-input");
    const type = x.type === "password" ? "text" : "password";
    x.type = type;
  }

  return (
    <>
      {success ? (
        <div className="wrapper">
          <h1 id="successful" className="register-h1">
            Sikeres bejelentkezés!
          </h1>
        </div>
      ) : (
        <div className="wrapper">
          {isLoading ? <Loading /> : <></>}
          <h1 className="register-h1">Bejelentkezés</h1>
          <p
            id="error-message"
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <center>
            <form
              id="signup-form"
              onSubmit={handleSubmit}
              className="register-form "
            >
              <div className="incorrect"></div>
              <div>
                <label htmlFor="email-input" className="register-label">
                  <span>@</span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email-input"
                  placeholder="Email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => {
                    setIncorrectClass();
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </div>
              <div>
                <label
                  htmlFor="password-input"
                  onClick={showPassword}
                  className="register-label"
                >
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
                  onChange={(e) => {
                    setIncorrectClass();
                    setPwd(e.target.value);
                  }}
                  value={pwd}
                />
              </div>
              <button type="submit" id="submit-button">
                Bejelentkezés
              </button>
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
