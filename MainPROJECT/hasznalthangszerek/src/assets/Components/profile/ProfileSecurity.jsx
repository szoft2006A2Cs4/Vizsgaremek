import React, { useState, useRef } from "react";
import axios from "../../scripts/axios";
import Loading from "../Loading";
import { Dialog } from "@chakra-ui/react";
import PasswordPopUp from "../PasswordPopUp";
import { faL } from "@fortawesome/free-solid-svg-icons";

const ProfileSecurity = ({ user }) => {
  const [email, setEmail] = useState(user.email);

  const [editEnabled, setEditEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pwdDialogShow, setPwdDialogShow] = useState(false);

  const [pwdStatus, setPwdStatus] = useState(null);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isPWDFocus, setIsPWDFocus] = useState(false);
  const pwdRef = useRef();

  const PUT_URL = `/api/User/${user.id}`;
  const RESET_URL = `/api/User/${user.id}`;

  const PWD_REGEX =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$!%*#?&_-]).{8,24}$/;

  const closePwdDial = () => {
    setPwdDialogShow(false);
    setPassword("");
    setConfirm("");
    setPwdStatus(null);
  };

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

  async function handlePwdReset() {
    if (!PWD_REGEX.test(password)) {
      setPwdStatus("invalid");
      return;
    }

    if (!password || password !== confirm) {
      setPwdStatus("mismatch");
      return;
    }

    setIsLoading(true);

    try {
      const resp = await axios.patch(
        RESET_URL,
        { pswd: confirm },
        {
          withCredentials: true,
        },
      );
      setPwdStatus("success");
      setTimeout(() => closePwdDial(), 1500);
    } catch (error) {
      setPwdStatus("error");
      console.log(error);
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
          onOpenChange={(e) => {
            setPwdDialogShow(e.open);
            if (!e.open) {
              closePwdDial();
            } else {
              setPwdDialogShow(true);
            }
          }}
          placement="center"
          size="lg"
        >
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header fontSize="2xl" justifyContent="center">
                <Dialog.Title>
                  Jelszó módosítás
                  {pwdStatus === "invalid" ? (
                    <h4 className="error-msg">
                      A jelszó nem felel meg a kritériumoknak!
                    </h4>
                  ) : (
                    <></>
                  )}
                  {pwdStatus === "mismatch" ? (
                    <h4 className="error-msg">A két jelszó nem egyezik meg!</h4>
                  ) : (
                    <></>
                  )}
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <div className="profile-sec-pwdUpdate">
                  <label className="profile-sec-label">Új jelszó</label>
                  <div id="profile-sec-input-wrapper">
                    <input
                      ref={pwdRef}
                      className={`profile-sec-input ${
                        pwdStatus === "mismatch" || pwdStatus === "invalid"
                          ? "profile-sec-input-wrong"
                          : ""
                      }`}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPwdStatus(null);
                      }}
                      onFocus={() => setIsPWDFocus(true)}
                      onBlur={() => setIsPWDFocus(false)}
                    />
                    <PasswordPopUp isopen={isPWDFocus} anchorRef={pwdRef} />
                  </div>
                </div>

                <br />
                <div className="profile-sec-pwdUpdate">
                  <label className="profile-sec-label">Megerősítés</label>
                  <input
                    className={`profile-sec-input ${
                      pwdStatus === "mismatch" ? "profile-sec-input-wrong" : ""
                    }`}
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value);
                      setPwdStatus(null);
                    }}
                  />
                </div>
              </Dialog.Body>
              <Dialog.Footer>
                <button
                  className="uni-button-sm"
                  onClick={() => closePwdDial()}
                >
                  Mégsem
                </button>
                <button
                  className="uni-button-sm"
                  onClick={() => handlePwdReset()}
                >
                  Mentés
                </button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      )}
    </>
  );
};

export default ProfileSecurity;
