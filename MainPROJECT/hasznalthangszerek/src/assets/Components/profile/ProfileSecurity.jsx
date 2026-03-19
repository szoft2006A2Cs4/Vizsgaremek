import React, { useState } from "react";
import axios from "../../scripts/axios";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const ProfileSecurity = ({ user }) => {
  const [email, setEmail] = useState(user.email);

  const [editEnabled, setEditEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
      <button className="uni-button">
        <Link to="/resetPassword" style={{ color: "white" }}>
          Jelszó módosítása
        </Link>
      </button>
      {showDialog ? (
        <dialog open className="edit-response-popup rounded-3">
          {success ? (
            <h6 className="text-center">Profil frissítése sikeres</h6>
          ) : (
            <h6 className="text-center">Profil frissítése sikertelen</h6>
          )}
          <button
            className="rounded-2 py-1 px-4 mt-3 uni-button"
            onClick={(e) => {
              setShowDialog(false);
              setEditEnabled(false);
            }}
          >
            RENDBEN
          </button>
        </dialog>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileSecurity;
