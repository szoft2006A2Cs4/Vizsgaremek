import axios from "@/assets/scripts/axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, Portal, CloseButton } from "@chakra-ui/react";

function Card({ instrument, user }) {
  const [dialogState, setDialogState] = useState({
    open: false,
    success: false,
  });

  async function HandleCreateForYou() {
    try {
      const resp = await axios.post(
        "/api/ForYou",
        {
          uId: user.id,
          cName: instrument.subCategory.cName,
        },
        {
          withCredentials: true,
        },
      );
      if (resp.status == 201) {
        setDialogState({ open: true, success: true });
      }
    } catch (error) {
      if (error.response?.status == 409) {
        setDialogState({ open: true, success: false });
      }
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

      <Dialog.Root
        open={dialogState.open}
        onOpenChange={(e) =>
          !e.open && setDialogState({ open: false, success: false })
        }
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header justifyContent="center">
                <Dialog.Title>
                  {dialogState.success
                    ? "Sikeresen hozzáadva!"
                    : "Ez a típus már kedvelt!"}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.CloseTrigger asChild>
                <CloseButton />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </section>
  );
}

function Instruments({ instruments, user }) {
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
        <Card key={instrument.id} instrument={instrument} user={user} />
      ))}
    </section>
  );
}

export default Instruments;
