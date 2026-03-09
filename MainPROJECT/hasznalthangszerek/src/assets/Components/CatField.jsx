import CatCard from "./CatCard";

export default function catField({ cats }) {
  return (
    <div id="catField">
      {cats.map((cat, index) => {
        return (
          <CatCard data={cat} key={cat.name} index={index} imgsrc={"asd"} />
        );
      })}
    </div>
  );
}
