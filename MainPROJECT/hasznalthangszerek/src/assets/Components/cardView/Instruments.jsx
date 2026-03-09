import React from "react";

function Card({ instrument }) {
  return (
    <section className="card">
      <img
        src="amba"
        alt=""
        className="card-img"
        //    hangszer képe ide
      />
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
  return (
    <>
      <section className="card-container">
        {instruments.map((instrument) => (
          <Card key={instrument.id} instrument={instrument} />
        ))}
      </section>
    </>
  );
}

export default Instruments;
