export default function catCard({ data }, imgsrc) {
  return (
    <div>
      <img src={imgsrc} />
      <h2>{data.name}</h2>
    </div>
  );
}
