import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../scripts/axios";

export default function ResetPWD() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  async function HandleReset() {
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
            <div id="forgot-styled-wrapper">
              <input
                type="password"
                placeholder="Új jelszó"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="forgot-styled-input"
              />
            </div>

            <div id="forgot-styled-wrapper">
              <input
                type="password"
                placeholder="Új jelszó megerősítése"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
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
