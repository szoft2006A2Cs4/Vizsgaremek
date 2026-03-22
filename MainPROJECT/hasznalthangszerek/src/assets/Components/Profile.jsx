import { useState, useEffect } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import Loading from "./Loading";
import axios from "../scripts/axios";
import { Avatar, RatingGroup, Dialog, Portal } from "@chakra-ui/react";
import ProfileGeneral from "./profile/ProfileGeneral";
import ProfileSecurity from "./profile/ProfileSecurity";
import ProfileUploads from "./profile/ProfileUploads";
import { useNavigate } from "react-router-dom";

const Profile = ({ mainLoading }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [insList, setInsList] = useState([]);
  const navigate = useNavigate();

  const INS_URL = "/api/Instrument";

  const handleDeletedUpload = (deletedId) => {
    setInsList((prev) => prev.filter((ins) => ins.id !== deletedId));
  };

  const tabs = [
    {
      name: "Általános adatok",
      component: <ProfileGeneral user={user} />,
    },
    {
      name: "Biztonsági beállítások",
      component: <ProfileSecurity user={user} />,
    },
    {
      name: "Saját feltöltéseim",
      component: (
        <ProfileUploads insList={insList} onDelete={handleDeletedUpload} />
      ),
    },
  ];

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const email = (
          await axios.get("api/login/me", { withCredentials: true })
        ).data.email;
        const response = await axios.get(`api/User/${email}`, {
          withCredentials: true,
        });
        const responseins = await axios.get(
          INS_URL + `/user/${response.data.id}`,
          {
            withCredentials: true,
          },
        );
        setUser(response.data);
        setInsList(responseins.data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  async function deleteUser() {
    setIsLoading(true);
    try {
      if (insList.length > 0) {
        for (var i of insList) {
          await axios.delete(`${INS_URL}/${i.id}`, { withCredentials: true });
        }
      }

      const foryous = await axios.get(`/api/ForYou/${user.id}`, {
        withCredentials: true,
      });
      if (foryous.status == 200) {
        for (var f of foryous.data) {
          await axios.delete(`/api/ForYou/${f.id}`, { withCredentials: true });
        }
      }

      await axios.delete(`/api/User/${user.id}`, { withCredentials: true });
      navigate(0);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading || mainLoading) {
    return <Loading />;
  }

  if (user === null) {
    return null;
  }

  return (
    <div>
      <Nav />
      <div id="profile-div">
        <div id="welcome-field">
          <div id="flexstart">
            <Avatar.Root w="56" h="56" bg="#2e2b41" color="white">
              <Avatar.Fallback
                fontSize="7xl"
                id="profile-icon"
                name={user.name}
              />
            </Avatar.Root>
            <h2>Üdvözöljük, {user.name.split(" ")[1]} !</h2>
            <div>
              <RatingGroup.Root
                allowHalf
                readOnly
                count={5}
                defaultValue={user.review}
                size="md"
                colorPalette="yellow"
              >
                <RatingGroup.HiddenInput />
                <RatingGroup.Control />
              </RatingGroup.Root>
              <p>{user.review}</p>
            </div>
          </div>
          <div id="flexend">
            <button
              className="uni-button delete-button"
              onClick={() => setShowDialog(true)}
            >
              Fiókom törlése
            </button>
          </div>
        </div>
        <div id="detail-field">
          <div className="col-8 border-start">
            <div className="row g-0 profile-tabs">
              {tabs.map((tab, index) => (
                <div
                  key={index}
                  className={`col-3 options ${index === activeTab ? "active-tab" : null}`}
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </div>
              ))}
            </div>
          </div>
          <div className="row g-0 mt-3 p-3">{tabs.at(activeTab).component}</div>
        </div>
        <Dialog.Root open={showDialog} size="lg">
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.CloseTrigger />
                <Dialog.Header justifyContent="center">
                  <Dialog.Title fontSize="xl">Fiók törlése</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body fontSize="large">
                  <h3>Biztosan törölni szeretnéd ezt a felhasználót?</h3>
                  <p>
                    A fiók törlése magával vonja minden ezen felhasználóhoz
                    tartozó adat végleges eltávolítását (hirdetések, rendelési
                    előzmények).
                  </p>
                  <span
                    style={{
                      display: "flex",
                      gap: "1.65rem",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className="uni-button  delete-button"
                      onClick={() => {
                        deleteUser();
                        setShowDialog(false);
                        navigate("/", { replace: true });
                      }}
                    >
                      IGEN
                    </button>
                    <button
                      className="uni-button"
                      onClick={() => {
                        setShowDialog(false);
                      }}
                    >
                      NEM
                    </button>
                  </span>
                </Dialog.Body>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
