import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const navigate = useNavigate();

  return (
    <div id="introduction">
      <div className="introduction-text">
        <h1>Üdvözlünk weboldalunkon!</h1>
        <h3>
          Nálunk gondosan válogatott, minőségi használt hangszereket találsz,
          amelyek új gazdájuknál is inspirálóan szólalnak meg. Legyél kezdő vagy
          tapasztalt zenész, célunk, hogy megfizethető áron segítsünk megtalálni
          a hozzád illő hangszert. Fedezd fel kínálatunkat, és adj új életet a
          zenének!
        </h3>
      </div>
    </div>
  );
}
