import { useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function ForgottenPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  function HandleResetEmail() {
    if (!email) return;
    setLoading(true);

    try {
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="wrapper">
      <h1 className="register-h1">Elfelejtett jelszó</h1>

      <center>
        <h4 className="forgot-subtitle">
          Adja meg azt az email-címét amivel regisztrált az oldalon és
          elfelejtette a jelszavát!
        </h4>
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
          />
        </div>

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
            onClick={() => {
              HandleResetEmail();
            }}
          >
            Küldés
          </button>
        </div>
      </center>
    </div>
  );
}
