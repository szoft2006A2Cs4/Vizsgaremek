import React, { useState } from "react";
import axios from "@/assets/scripts/axios";
import Loading from "../Loading";
import { Dialog, DialogRoot } from "@chakra-ui/react";

const ProfileGeneral = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [postalCode, setPostalCode] = useState(user.postalCode);
  const [city, setCity] = useState(user.city);
  const [address, setAddress] = useState(user.streetHouseNumber);
  const [phone, setPhone] = useState(user.phoneNumber);

  const [editEnabled, setEditEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const PUT_URL = `/api/User/${user.id}`;

  async function handleUpdate() {
    const updatedUser = {
      Id: user.id,
      Name: name,
      Email: user.email,
      PhoneNumber: phone,
      Password: user.password,
      Review: user.review,
      PostalCode: postalCode,
      City: city,
      StreetHouseNumber: address,
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
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <div id="general-details">
        <label className="profile-label" htmlFor="userName">
          Név
        </label>
        <input
          className="profile-input col-5"
          type={"text"}
          id={"userName"}
          placeholder={name}
          label={"UserName"}
          value={name}
          disabled={!editEnabled}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label className="profile-label" htmlFor="userPostalCode">
          Irányítószám
        </label>
        <input
          className="profile-input col-5"
          type={"text"}
          id={"userPostalCode"}
          placeholder={postalCode}
          label={"PostalCode"}
          value={postalCode}
          disabled={!editEnabled}
          onChange={(e) => {
            setPostalCode(e.target.value);
          }}
        />
        <label className="profile-label" htmlFor="userCity">
          Település
        </label>
        <input
          className="profile-input col-5"
          type={"text"}
          id={"userCity"}
          placeholder={city}
          label={"City"}
          value={city}
          disabled={!editEnabled}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <label className="profile-label" htmlFor="userAddress">
          Lakcím
        </label>
        <input
          className="profile-input col-5"
          type={"text"}
          id={"userAddress"}
          placeholder={address}
          label={"Email"}
          value={address}
          disabled={!editEnabled}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
        <label className="profile-label" htmlFor="userPhone">
          Telefonszám
        </label>
        <input
          className="profile-input col-5"
          type={"text"}
          id={"userPhone"}
          placeholder={phone}
          label={"Email"}
          value={phone}
          disabled={!editEnabled}
          onChange={(e) => {
            setPhone(e.target.value);
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
      {showDialog ? (
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
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileGeneral;
