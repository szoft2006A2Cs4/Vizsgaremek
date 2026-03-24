import { useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Loading from "./Loading";
import axios from "../scripts/axios";

export default function ForgottenPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function HandleResetEmail() {
    if (!email) return;
    setLoading(true);

    try {
      const resp = await axios.post(
        "/api/Login/forgot-pwd",
        JSON.stringify(email),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );

      if (!resp.data.token) {
        setStatus("success");
        return;
      }

      const resetLink = `${window.location.origin}/resetPWD?token=${encodeURIComponent(resp.data.token)}`;

      await emailjs.send(
        "hasznalthangszerek",
        "passwordtemplate",
        {
          to_email: email,
          link: resetLink,
        },
        { publicKey: "u8I9aEohwoXlxEDHy" },
      );

      setStatus("success");
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="wrapper">
      {loading && <Loading />}
      <h1 className="register-h1">Elfelejtett jelszó</h1>

      <center>
        <h4 className="forgot-subtitle">
          Adja meg azt az email-címét amivel regisztrált az oldalon és
          elfelejtette a jelszavát!
        </h4>
        {status === "success" ? (
          <p style={{ color: "lawngreen" }}>
            Ha az email címmel van regisztrált felhasználó, elküldtük a
            visszaállító linket!
          </p>
        ) : (
          <>
            <div id="forgot-styled-wrapper">
              <label htmlFor="email-input" id="forgot-label">
                <span>@</span>
              </label>
              <input
                type="text"
                name="email"
                id="forgot-styled-input"
                placeholder="Email"
                autoComplete="off"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            {status === "error" && (
              <p className="error-msg">
                Hiba történt a kérés végrehajtása során, próbálja újra!
              </p>
            )}

            <div className="forgot-btn-cont">
              <button
                className="uni-button"
                onClick={() => {
                  navigate("/", { replace: true });
                }}
              >
                Mégsem
              </button>
              <button
                className="uni-button"
                onClick={HandleResetEmail}
                disabled={!email || loading}
              >
                Küldés
              </button>
            </div>
          </>
        )}
      </center>
    </div>
  );
}
