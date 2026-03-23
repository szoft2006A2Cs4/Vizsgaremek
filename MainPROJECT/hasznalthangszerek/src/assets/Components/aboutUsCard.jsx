export default function aboutUsCard({ img, name, instaLink }) {
  return (
    <div className="aboutUs-card">
      <div className="card-border-top"></div>
      <img src={img} className="img" />

      <span>{name}</span>
      <button
        onClick={() => {
          window.open(instaLink, "_blank");
        }}
      >
        Click
      </button>
    </div>
  );
}
