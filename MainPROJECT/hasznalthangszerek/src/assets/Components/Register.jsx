import { useRef, useState, useEffect } from "react";
import "../style/register.css";
import { Link } from "react-router-dom";
import axios from "../scripts/axios";
import Loading from "./Loading";
import PasswordPopUp from "./PasswordPopUp";
import { Popover } from "@chakra-ui/react";

const USER_REGEX =
  /^[A-ZÁÉÍÓÖŐÚÜŰ][a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]*([ -][A-ZÁÉÍÓÖŐÚÜŰ][a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]*)+$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$!%*#?&_-]).{8,24}$/;
const REGISTER_URL = "api/User";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const pwdInputRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [postal, setpostal] = useState("");
  const [validPostal, setValidPostal] = useState(false);
  const [postalFocus, setPostalFocus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = phone;
    console.log(result);
    console.log(phone);
    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    const result = postal;
    console.log(result);
    console.log(postal);
    setValidPostal(result);
  }, [postal]);

  useEffect(() => {
    const result = city;
    console.log(result);
    console.log(city);
    setValidCity(result);
  }, [city]);

  useEffect(() => {
    const result = address;
    console.log(result);
    console.log(address);
    setValidAddress(result);
  }, [address]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, email, phone, postal, city, address, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    const usernameInput = document.getElementById("username-input");
    const emailInput = document.getElementById("email-input");
    const phoneInput = document.getElementById("phone-input");
    const postalInput = document.getElementById("postal-input");
    const cityInput = document.getElementById("city-input");
    const addressInput = document.getElementById("address-input");
    const passwordInput = document.getElementById("password-input");
    const repasswordInput = document.getElementById("repassword-input");
    const submitButton = document.getElementById("submit-button");
    const allInputs = [
      usernameInput,
      emailInput,
      phoneInput,
      postalInput,
      cityInput,
      addressInput,
      passwordInput,
      repasswordInput,
    ];
    //const errors = 0;

    e.preventDefault();

    if (user === "" || user == null) {
      setErrMsg(`Hiba történt: A név szükséges!`);
      //errosr++;
      usernameInput.parentElement.classList.add("incorrect");
      return;
    }
    if (!user.match(USER_REGEX)) {
      setErrMsg(`Hiba történt: A név nem megfelelő formátumú!`);
      //errosr++;
      usernameInput.parentElement.classList.add("incorrect");
      return;
    }
    if (email === "" || email == null) {
      setErrMsg("Hiba történt: Az email szükséges!");
      //errors++;
      emailInput.parentElement.classList.add("incorrect");
      return;
    }
    if (!email.match(EMAIL_REGEX)) {
      setErrMsg("Nem megfelelő email cím formátum!");
      //errors++;
      emailInput.parentElement.classList.add("incorrect");
      return;
    }
    if (phone === "" || phone == null) {
      setErrMsg("Hiba történt: A telefonszám szükséges!");
      //errors++;
      phoneInput.parentElement.classList.add("incorrect");
      return;
    }
    if (postal === "" || postal == null) {
      setErrMsg("Hiba történt: Az irányítószám szükséges!");
      //errors++;
      postalInput.parentElement.classList.add("incorrect");
      return;
    }
    if (city === "" || city == null) {
      setErrMsg("Hiba történt: A város szükséges!");
      //errors++;
      cityInput.parentElement.classList.add("incorrect");
      return;
    }
    if (address === "" || address == null) {
      setErrMsg("Hiba történt: A lakcímet kötelező megadni");
      //errors++;
      addressInput.parentElement.classList.add("incorrect");
      return;
    }
    if (pwd === "" || pwd == null) {
      setErrMsg("Hiba történt: A jelszó szükséges!");
      //errors++;
      passwordInput.parentElement.classList.add("incorrect");
      return;
    }
    if (!PWD_REGEX.test(pwd)) {
      setErrMsg("Hiba történt: A jelszó nem felel meg a követelményeknek!");
      //errors++;
      passwordInput.parentElement.classList.add("incorrect");
      return;
    }
    if (matchPwd === "" || matchPwd == null) {
      setErrMsg("Hiba történt: A jelszó megerősítése szükséges!");
      //errors++;
      repasswordInput.parentElement.classList.add("incorrect");
      return;
    }
    if (matchPwd != pwd) {
      setErrMsg(
        "Hiba történt: A megerősítő jelszó nem egyezik az eredeti jelszóval!",
      );
      //errors++;
      passwordInput.parentElement.classList.add("incorrect");
      repasswordInput.parentElement.classList.add("incorrect");
    } else {
      setIsLoading(true);
      try {
        const userData = {
          Name: user,
          Email: email,
          PhoneNumber: Number(phone),
          Password: pwd,
          PostalCode: parseInt(postal),
          City: city,
          StreetHouseNumber: address,
          Role: "User",
        };
        const response = await axios.post(REGISTER_URL, userData);

        console.log("Szerver válasza: ", response.data);
        setSuccess(true);
      } catch (err) {
        if (err.response?.status === 409) {
          setErrMsg("Ezzel az email-címmel már létezik felhasználó!");
          for (let x of allInputs) {
            x.removeAttribute("disabled");
          }
          submitButton.removeAttribute("disabled");
        } else if (err.response?.status === 400) {
          setErrMsg("Hibás vagy hiányzó adatok!");
          for (let x of allInputs) {
            x.removeAttribute("disabled");
          }
          submitButton.removeAttribute("disabled");
        } else {
          setErrMsg("Hálózati hiba vagy a szerver nem elérhető.");
          for (let x of allInputs) {
            x.removeAttribute("disabled");
          }
          submitButton.removeAttribute("disabled");
        }
        errRef.current.focus();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const setIncorrectClass = () => {
    const usernameInput = document.getElementById("username-input");
    const emailInput = document.getElementById("email-input");
    const phoneInput = document.getElementById("phone-input");
    const postalInput = document.getElementById("postal-input");
    const cityInput = document.getElementById("city-input");
    const addressInput = document.getElementById("address-input");
    const passwordInput = document.getElementById("password-input");
    const repasswordInput = document.getElementById("repassword-input");
    const allInputs = [
      usernameInput,
      emailInput,
      phoneInput,
      postalInput,
      cityInput,
      addressInput,
      passwordInput,
      repasswordInput,
    ];

    allInputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (input.parentElement.classList.contains("incorrect")) {
          input.parentElement.classList.remove("incorrect");
        }
      });
    });
  };

  function showPassword() {
    let x = document.getElementById("password-input");
    const type = x.type === "password" ? "text" : "password";
    x.type = type;
  }

  function showRePassword() {
    let x = document.getElementById("repassword-input");
    const type = x.type === "password" ? "text" : "password";
    x.type = type;
  }

  return (
    <>
      {success ? (
        <div className="wrapper">
          <h1 id="successful" className="register-h1">
            A regisztráció sikeres!
          </h1>
          <br />
          <p>
            <Link to="/login">Bejelentkezés</Link>
          </p>
        </div>
      ) : (
        <div className="wrapper">
          {isLoading ? <Loading /> : <></>}
          <h1 className="register-h1">Regisztráció</h1>
          <p
            ref={errRef}
            id="error-message"
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
              <div>
                <label htmlFor="username-input" className="register-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8e3eD"
                  >
                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
                  </svg>
                </label>
                <input
                  type="text"
                  name="username"
                  id="username-input"
                  placeholder="Név"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => {
                    setIncorrectClass();
                    setUser(e.target.value);
                  }}
                  aria-invalid={validName ? "false" : true}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
              </div>
              <div>
                <label htmlFor="email-input" className="register-label">
                  <span>@</span>
                </label>
                <input
                  type="text"
                  name="email"
                  id="email-input"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => {
                    setIncorrectClass();
                    setEmail(e.target.value);
                  }}
                  aria-invalid={validEmail ? "false" : true}
                  aria-describedby="emailnote"
                  onFocus={() => setEmailFocus(true)}
                  onBlur={() => setEmailFocus(false)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="register-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e8e3eD"
                  >
                    <path d="M162-120q-18 0-30-12t-12-30v-162q0-13 9-23.5t23-14.5l138-28q14-2 28.5 2.5T342-374l94 94q38-22 72-48.5t65-57.5q33-32 60.5-66.5T681-524l-97-98q-8-8-11-19t-1-27l26-140q2-13 13-22.5t25-9.5h162q18 0 30 12t12 30q0 125-54.5 247T631-329Q531-229 409-174.5T162-120Z" />
                  </svg>
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone-input"
                  placeholder="Telefonszám"
                  autoComplete="off"
                  onChange={(e) => {
                    setIncorrectClass();
                    setPhone(e.target.value);
                  }}
                  aria-invalid={validPhone ? "false" : true}
                  aria-describedby="phonenote"
                  onFocus={() => setPhoneFocus(true)}
                  onBlur={() => setPhoneFocus(false)}
                />
              </div>
              <div>
                <label htmlFor="x" className="register-label">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
                  </svg>
                </label>
                <input
                  type="number"
                  name="postal"
                  id="postal-input"
                  placeholder="Irányítószám"
                  pattern="[1-9]{4}"
                  autoComplete="off"
                  onChange={(e) => {
                    setIncorrectClass();
                    setpostal(e.target.value);
                  }}
                  aria-invalid={validPostal ? "false" : true}
                  aria-describedby="addressnote"
                  onFocus={() => setPostalFocus(true)}
                  onBlur={() => setPostalFocus(false)}
                />
                <input
                  type="text"
                  name="city"
                  id="city-input"
                  placeholder="Település"
                  autoComplete="off"
                  onChange={(e) => {
                    setIncorrectClass();
                    setCity(e.target.value);
                  }}
                  aria-invalid={validCity ? "false" : true}
                  aria-describedby="addressnote"
                  onFocus={() => setCityFocus(true)}
                  onBlur={() => setCityFocus(false)}
                />
                <input
                  type="text"
                  name="address"
                  id="address-input"
                  placeholder="Utca és házszám"
                  autoComplete="off"
                  onChange={(e) => {
                    setIncorrectClass();
                    setAddress(e.target.value);
                  }}
                  aria-invalid={validAddress ? "false" : true}
                  aria-describedby="addressnote"
                  onFocus={() => setAddressFocus(true)}
                  onBlur={() => setAddressFocus(false)}
                />
              </div>
              <div style={{ position: "relative" }}>
                <label
                  id="password-label"
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
                  ref={pwdInputRef}
                  type="password"
                  name="password"
                  id="password-input"
                  placeholder="Jelszó"
                  onChange={(e) => {
                    if (
                      e.target.parentElement.classList.contains("incorrect")
                    ) {
                      e.target.parentElement.classList.remove("incorrect");
                    }
                    setPwd(e.target.value);
                  }}
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <PasswordPopUp isopen={pwdFocus} anchorRef={pwdInputRef} />
              </div>
              <div>
                <label
                  id="repassword-label"
                  onClick={showRePassword}
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
                  name="repassword"
                  id="repassword-input"
                  placeholder="Jelszó megerősítése"
                  onChange={(e) => {
                    setIncorrectClass();
                    setMatchPwd(e.target.value);
                  }}
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
              </div>
              <button id="submit-button" type="submit">
                Regisztráció
              </button>
            </form>
          </center>
          <p>
            Már van fiókja? <Link to="/login">Bejelentkezés</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Register;
