import { useNavigate } from "react-router-dom";

export default function catCard({ data }) {
  const navigte = useNavigate();

  return (
    <div
      className="cat-card"
      onClick={() =>
        navigte(`\instruments?category=${data.Name + "hangszerek"}`, {
          replace: true,
        })
      }
    >
      <img src={data.ImgSRC} className="cat-card-imgs" />
      <h2>{data.Name}</h2>
    </div>
  );
}
