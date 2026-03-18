import { useNavigate } from "react-router-dom";

export default function ForgottenPassword() {
  const navigate = useNavigate();

  function HandleResetEmail() {}

  return (
    <div id="forgot-page">
      <div id="forgot-card">
        <h2>Elfelejtett jelszó</h2>

        <h4>
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

        <div id="forgot-btn-cont">
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
      </div>
    </div>
  );
}
