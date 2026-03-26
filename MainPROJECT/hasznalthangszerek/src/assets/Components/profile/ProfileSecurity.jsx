import React, { useState } from "react";
import axios from "../../scripts/axios";
import Loading from "../Loading";
import { Dialog } from "@chakra-ui/react";

const ProfileSecurity = ({ user }) => {
  const [email, setEmail] = useState(user.email);

  const [editEnabled, setEditEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pwdDialogShow, setPwdDialogShow] = useState(true);

  const PUT_URL = `/api/User/${user.id}`;

  async function handleUpdate() {
    const updatedUser = {
      Id: user.id,
      Name: user.name,
      Email: email,
      PhoneNumber: user.phoneNumber,
      Password: user.password,
      Review: user.review,
      PostalCode: user.postalCode,
      City: user.city,
      StreetHouseNumber: user.streetHouseNumber,
      Role: user.role,
      Token: user.token,
      ImageId: user.imageId,
    };

    try {
      setIsLoading(true);
      const response = await axios.put(PUT_URL, updatedUser, {
        withCredentials: true,
      });
      setSuccess(true);
      setShowDialog(true);
      return response.data;
    } catch (err) {
      setSuccess(false);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div id="security-details">
        <label className="profile-label" htmlFor="userName">
          Email
        </label>
        <input
          className="profile-input col-5"
          type={"text"}
          id={"userName"}
          placeholder={email}
          label={"UserName"}
          value={email}
          disabled={!editEnabled}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div className="confirm-button">
        {editEnabled ? (
          <>
            <button
              className="uni-button"
              onClick={() => {
                setShowDialog(true);
                handleUpdate();
              }}
            >
              FRISSÍTÉS
            </button>
            <button
              className="uni-button delete-button"
              onClick={() => {
                setEditEnabled(false);
              }}
            >
              MÉGSEM
            </button>
          </>
        ) : (
          <button className="uni-button" onClick={() => setEditEnabled(true)}>
            MÓDOSÍTÁS
          </button>
        )}
      </div>
      <button className="uni-button" onClick={() => setPwdDialogShow(true)}>
        Jelszó módosítása
      </button>
      {showDialog && (
        <Dialog.Root
          open={showDialog}
          onOpenChange={(e) => setShowDialog(e.open)}
          placement="center"
        >
          <Dialog.Positioner
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Dialog.Content>
              <Dialog.Header justifyContent="center" fontSize="2xl">
                {success
                  ? "Profil frissítése sikeres"
                  : "Profil frissítése sikertelen"}
              </Dialog.Header>

              <Dialog.Body>
                <button
                  className="rounded-2 py-1 px-4 mt-3 uni-button"
                  onClick={(e) => {
                    setShowDialog(false);
                    setEditEnabled(false);
                  }}
                >
                  RENDBEN
                </button>
              </Dialog.Body>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      )}

      {pwdDialogShow && (
        <Dialog.Root
          open={pwdDialogShow}
          onOpenChange={(e) => setPwdDialogShow(e.open)}
          placement="center"
          size="lg"
        >
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontSize="2xl" justifyContent="center">
                <Dialog.Title>Jelszó módosítás</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <div id="profile-sec-pwdUpdate">
                  <label className="profile-sec-label">Új jelszó</label>
                  <input className="profile-sec-input"></input>
                </div>
                <br />
                <div id="profile-sec-pwdUpdate">
                  <label className="profile-sec-label">Megerősítés</label>
                  <input className="profile-sec-input"></input>
                </div>
              </Dialog.Body>
              <Dialog.Footer>
                <button className="uni-button-sm">Mégsem</button>
                <button className="uni-button-sm">Mentés</button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      )}
    </>
  );
};

export default ProfileSecurity;
