import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../scripts/axios";
import PasswordPopUp from "./PasswordPopUp";

export default function ResetPWD() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPWDFocus, setIsPWDFocus] = useState(false);
  const pwdRef = useRef();

  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$!%*#?&_-]).{8,24}$/;

  async function HandleReset() {
    if (!PWD_REGEX.test(password)) {
      setStatus("invalid");
      return;
    }
    if (!password || password !== confirm) {
      setStatus("mismatch");
      return;
    }

    setLoading(true);

    try {
      const resp = await axios.patch(
        "api/Login/reset-pwd",
        { token, newPWD: password },
        { withCredentials: true },
      );
      setStatus("success");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } catch (error) {
      setStatus("error");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  if (!token)
    return (
      <div className="wrapper">
        <h1 className="register-h1">Érvénytelen link.</h1>
      </div>
    );

  return (
    <div className="wrapper">
      <h1 className="register-h1">Jelszó visszaállítás</h1>

      <center>
        {status === "success" ? (
          <p>A jelszó sikeresen megváltozotatva, átirányítjuk . . .</p>
        ) : (
          <>
            <div
              className={`forgot-styled-wrapper ${status === "mismatch" || ("invalid" && status !== "") ? "forgot-mismatch" : ""}`}
            >
              <label className="forgot-label">
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
                ref={pwdRef}
                type="password"
                placeholder="Új jelszó"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setStatus("");
                }}
                onFocus={() => setIsPWDFocus(true)}
                onBlur={() => setIsPWDFocus(false)}
                className="forgot-styled-input"
              />
              <PasswordPopUp isopen={isPWDFocus} anchorRef={pwdRef} />
            </div>

            <br />

            <div
              className={`forgot-styled-wrapper ${status === "mismatch" ? "forgot-mismatch" : ""}`}
            >
              <label className="forgot-label">
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
                placeholder="Új jelszó megerősítése"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  setStatus("");
                }}
                className="forgot-styled-input"
              />
            </div>

            {status === "mismatch" && (
              <p className="error-msg">A két jelszó nem egyezik!</p>
            )}
            {status === "error" && (
              <p className="error-msg">Érvénytelen vagy lejárt link!</p>
            )}
            {status === "invalid" && (
              <p className="error-msg">
                A jelszó nem felel meg a kritériumoknak!
              </p>
            )}

            <div className="forgot-btn-cont">
              <button
                className="uni-button"
                onClick={() => {
                  navigate("/");
                }}
              >
                Mégsem
              </button>
              <button
                className="uni-button"
                onClick={HandleReset}
                disabled={loading}
              >
                {loading ? "Mentés . . ." : "Mentés"}
              </button>
            </div>
          </>
        )}
      </center>
    </div>
  );
}
