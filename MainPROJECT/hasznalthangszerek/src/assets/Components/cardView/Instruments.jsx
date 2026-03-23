import axios from "@/assets/scripts/axios";
import React from "react";
import { Link } from "react-router-dom";

function Card({ instrument }) {
  async function HandleCreateForYou() {
    try {
      const resp = await axios.post(
        "/api/ForYou",
        {
          uId: instrument.seller.Id,
          cName: instrument.subCategory.cName,
        },
        {
          withCredentials: true,
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="card">
      <img src={instrument.imageUrls[0]} alt="" className="card-img" />
      <div className="card-details">
        <h3 className="card-title">{instrument.name}</h3>
        <section className="card-price">
          <div className="price">{instrument.cost} HUF</div>
          <div className="details">
            <button className="uni-button">
              <Link
                to={`/instruments?ins=${instrument.id}`}
                className="card-button-link"
              >
                Részletek
              </Link>
            </button>

            <button
              className="uni-button-sm"
              onClick={() => {
                HandleCreateForYou();
              }}
            >
              Típus kedvelése
            </button>
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
