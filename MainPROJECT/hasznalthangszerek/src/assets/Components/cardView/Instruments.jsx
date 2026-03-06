import React from "react";

function Instruments() {
  return (
    <>
      <section className="card-container">
        <section className="card">
          <img
            src=""
            alt=""
            className="card-img"
            //    hangszer képe ide
          />
          <div className="card-details">
            <h3 clasName="card-title">{/* hangszer neve ide */}</h3>
            <section className="crad-price">
              <div className="price">{/* ár ide */}</div>
              <div className="details">
                <button className="uni-button">Részletek</button>
              </div>
            </section>
          </div>
        </section>
      </section>
    </>
  );
}

export default Instruments;
