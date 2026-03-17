import React from "react";

function Card({ instrument }) {
  return (
    <section className="card">
      <img src={instrument.imageUrls[0]} alt="" className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{instrument.name}</h3>
        <section className="crad-price">
          <div className="price">{instrument.cost}</div>
          <div className="details">
            <button className="uni-button">Részletek</button>
          </div>
        </section>
      </div>
    </section>
  );
}

function Instruments({ instruments }) {
  if (instruments.length === 0) {
    return (
      <section className="card-container">
        <div className="no-results">
          <p>Nincs a szűrési feltételeknek megfelelő hangszer.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="card-container">
      {instruments.map((instrument) => (
        <Card key={instrument.id} instrument={instrument} />
      ))}
    </section>
  );
}

export default Instruments;
