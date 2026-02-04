import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Login from "./Login";
import "../style/register.css";
import { Link, matchRoutes } from "react-router-dom";

const USER_REGEX =
  /^[A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+(?:[- ][A-ZÁÉÍÓÖŐÚÜŰ][a-záéíóöőúüű]+)*$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[0-9])(?=.*[#@$!%_-]){8,24}$/;

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

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

  return (
    <div className="wrapper">
      <h1>Regisztráció</h1>
      {/* <p id="error-message"></p> */}
      <p
        ref={errRef}
        id="error-message"
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <center>
        <form id="signup-form">
          <div>
            <label htmlFor="username-input">
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
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : true}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
          </div>
          <p
            id="uidnote"
            className={
              userFocus && user && !validName ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Kérem adjon meg 4-24 hosszúságú nevet, mely megfelel a magyar
            helyesírás szabályainak! (pl. Gibsz Jakab)
          </p>
          <div>
            <label htmlFor="email-input">
              <span>@</span>
            </label>
            <input
              type="text"
              name="email"
              id="email-input"
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-invalid={validEmail ? "false" : true}
              aria-describedby="emailnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>
          <p
            id="emailnote"
            className={
              emailFocus && email && !validEmail ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Kérjük, adjon meg egy érvényes email címet! (pl: nev@domain.hu)
          </p>
          <div>
            <label htmlFor="phone">
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
              pattern="06[237]0-[0-9]{3}-[0-9]{4}"
              autoComplete="off"
              onChange={(e) => setPhone(e.target.value)}
              required
              aria-invalid={validPhone ? "false" : true}
              aria-describedby="phonenote"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
          </div>
          <p
            id="phonenote"
            className={
              phoneFocus && phone && !validPhone ? "instructions" : "offscreen"
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Kérjük, adja meg a telefonszámát! (pl: 0630 123-4567)
          </p>
          <div>
            <label htmlFor="x">
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
              onChange={(e) => setpostal(e.target.value)}
              required
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
              onChange={(e) => setCity(e.target.value)}
              required
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
              onChange={(e) => setAddress(e.target.value)}
              required
              aria-invalid={validAddress ? "false" : true}
              aria-describedby="addressnote"
              onFocus={() => setAddressFocus(true)}
              onBlur={() => setAddressFocus(false)}
            />
            <p
              id="addressnote"
              className={
                (postalFocus && postal && !validPostal) ||
                (cityFocus && city && !validCity) ||
                (addressFocus && address && !validAddress)
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Kérjük adja meg a teljes címet: irányítószám, város, utca és
              házszám (pl. 1051 Budapest, Deák tér 1.)
            </p>
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
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
          </div>
          <p
            id="pwdnote"
            className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Kérjük, adja meg a jelszavát! <br />
            A jelszó hossza 8-24 karakter lehet.
            <br />A jelszónak tartalmaznia kell legalább 1 nagybetűt, 1 számot
            és egy speciális karaktert.
          </p>
          <div>
            <label htmlFor="repassword-input">
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
            />
          </div>
          <button type="submit">Regisztráció</button>
        </form>
      </center>
      <p>
        Már van fiókja? <Link to="/login">Bejelentkezés</Link>
      </p>
    </div>
  );
};

export default Register;
