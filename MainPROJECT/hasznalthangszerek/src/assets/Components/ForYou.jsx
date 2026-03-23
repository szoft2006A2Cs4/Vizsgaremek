import { Dialog, DataList, CloseButton, Portal } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "../scripts/axios";
import AuthContext from "../scripts/AuthProvider";

export default function ForYou({ open, onClose, loading }) {
  const { auth } = useContext(AuthContext);
  const [forYouList, setForYouList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const resp = await axios.get(`/api/ForYou/${auth.user}`, {
          withCredentials: true,
        });
        setForYouList(resp.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (auth.user) fetchData();
  }, []);

  async function HandleForYouDelete(id) {
    try {
      await axios.delete(`/api/ForYou/${id}`);
      setForYouList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  if (loading && forYouList) return null;
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Kedvelt típusok</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="8">
              {forYouList == undefined ? (
                "Még nincs kedvelt kategóriája!"
              ) : (
                <DataList.Root orientation="horizontal">
                  {forYouList.map((item, index) => (
                    <DataList.Item key={index}>
                      <DataList.ItemLabel>Kategória: </DataList.ItemLabel>
                      <DataList.ItemValue>{item.cName}</DataList.ItemValue>
                      <button
                        className="uni-button-sm"
                        onClick={() => HandleForYouDelete(item.id)}
                      >
                        Törlés
                      </button>
                    </DataList.Item>
                  ))}
                </DataList.Root>
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
