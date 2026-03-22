import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import { Dialog, Portal, Table } from "@chakra-ui/react";
import axios from "@/assets/scripts/axios";

const insURL = "/api/Instrument";

const ProfileUploads = ({ insList }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadDeleteSure, setIsUploadDeleteSure] = useState(false);
  const [selectedInsData, setSelectedInsData] = useState({ name: "", id: "" });

  async function deleteIns(iid) {
    if (iid == null) return;
    try {
      setIsLoading(true);
      const resp = await axios.delete(insURL + `/${iid}`, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
        <Table.Root size="sm" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader>Termék neve</Table.ColumnHeader>
              <Table.ColumnHeader>Kategória</Table.ColumnHeader>
              <Table.ColumnHeader>Ár</Table.ColumnHeader>
              <Table.ColumnHeader>Állapot</Table.ColumnHeader>
              <Table.ColumnHeader>
                <img src="https://res.cloudinary.com/dknhbvrq9/image/upload/v1774189743/settings-2_bcp8ge.svg" />
              </Table.ColumnHeader>
              <Table.ColumnHeader />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {insList.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.subCategory.cName}</Table.Cell>
                <Table.Cell>{item.cost}</Table.Cell>
                <Table.Cell>{item.sold ? "ELadva" : "Nincs eladva"}</Table.Cell>
                <Table.Cell>
                  <a
                    className="ProfileUploads-settings"
                    onClick={() => {
                      setSelectedInsData({ name: item.name, id: item.id });
                      setIsUploadDeleteSure(true);
                    }}
                  >
                    Törlés
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a className="ProfileUploads-settings">Módosítás</a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <Dialog.Root open={isUploadDeleteSure}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />
              <Dialog.Header justifyContent="center">
                <Dialog.Title fontSize="xl">Hírdetés törlése</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body fontSize="large">
                <h3>
                  Biztosan szeretné törölni a kiválasztott hírdetést:
                  <br />
                  {selectedInsData.name}?
                </h3>
                <p>
                  A törölt hangszer minden adata véglegesen eltávolításra kerül
                  a rendszerünkből!
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
                      deleteIns(selectedInsData.id);
                      setIsUploadDeleteSure(false);
                    }}
                  >
                    IGEN
                  </button>
                  <button
                    className="uni-button"
                    onClick={() => {
                      setIsUploadDeleteSure(false);
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
    </>
  );
};

export default ProfileUploads;
