export default function aboutUsCard({ img, name, subTitle }) {
  return (
    <div className="card">
      <div className="card-border-top"></div>
      <img src={img} className="img" />

      <span>{name}</span>
      <p className="job">{subTitle}</p>
      <button> Click</button>
    </div>
  );
}
