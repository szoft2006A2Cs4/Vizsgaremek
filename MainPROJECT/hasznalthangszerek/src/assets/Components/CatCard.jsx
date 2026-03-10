import { useNavigate } from "react-router-dom";

export default function catCard({ data }) {

  const navigte = useNavigate();

  return (
    <div className="cat-card" onClick={() => navigte("\instruments", {replace: true})}>
      <img src={data.ImgSRC} className="cat-card-imgs"/>
      <h2>{data.Name}</h2>
    </div>
  );
}
