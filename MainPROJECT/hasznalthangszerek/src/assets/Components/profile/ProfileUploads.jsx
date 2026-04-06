import React, { useState, useEffect } from "react";
import Loading from "../Loading";
import {
  Dialog,
  Portal,
  Table,
  SegmentGroup,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import axios from "@/assets/scripts/axios";
import { InfoTip } from "@/components/ui/toggle-tip";

const insURL = "/api/Instrument";

const ProfileUploads = ({ insList, onDelete, onModify }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadDeleteSure, setIsUploadDeleteSure] = useState(false);
  const [isUploadModifySure, setIsUploadModifySure] = useState(false);
  const [selectedInsData, setSelectedInsData] = useState({});

  const radioOptions = [
    {
      label: "Újszerű",
      value: "Újszerű",
      desc: "Alig használt, karcmentes, vagy alig látható, minimális használati nyomokkal rendelkezik.",
    },
    {
      label: "Kiváló",
      value: "Kiváló",
      desc: "Kisebb kozmetikai hibák, mint például enyhe pengetési karcok (pick marks), finom felületi sérülések vagy apró benyomódások.",
    },
    {
      label: "Jó",
      value: "Jó",
      desc: "Több látható használati nyom, kisebb karcok, övcsat-karcok (buckle rash) a gitárok hátulján, vagy kisebb kopások a fémrészeken.",
    },
    {
      label: "Átlagos",
      value: "Átlagos",
      desc: "Jelentősebb esztétikai hibák, mint például mélyebb karcok, benyomódások, repedések a lakkban, de a fa szerkezete ép.",
    },
    {
      label: "Használt",
      value: "Használt",
      desc: "Jelentős kopás, nagyobb benyomódások, a funkcionalitást kismértékben befolyásoló hibák (pl. kopott bundok).",
    },
    {
      label: "Hibás-rossz",
      value: "Hibás-rossz",
      desc: "Komoly sérülések (törés, repedés), hiányzó alkatrészek, súlyos korrózió.",
    },
  ];

  async function deleteIns(iid) {
    if (iid == null) return;
    try {
      setIsLoading(true);
      const resp = await axios.delete(insURL + `/${iid}`, {
        withCredentials: true,
      });
      onDelete(iid);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateIns(iid) {
    const data = {
      Id: selectedInsData.id,
      Name: selectedInsData.name,
      Cost: selectedInsData.cost,
      Description: selectedInsData.description,
      Sold: selectedInsData.sold,
      UId: selectedInsData.uId,
      SCName: selectedInsData.scName,
      IsPremium: selectedInsData.isPremium,
      Condition: selectedInsData.condition,
      ImageCount: selectedInsData.ImageCount,
      Seller: selectedInsData.seller,
      SubCategory: selectedInsData.subCategory,
    };
    try {
      setIsLoading(true);
      await axios.put(`${insURL}/${iid}`, data, {
        withCredentials: true,
      });
      onModify();
    } catch (err) {
      console.log(err);
    } finally {
      onModify();
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
                      setSelectedInsData(item);
                      setIsUploadDeleteSure(true);
                    }}
                  >
                    Törlés
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    className="ProfileUploads-settings"
                    onClick={() => {
                      setSelectedInsData(item);
                      setIsUploadModifySure(true);
                    }}
                  >
                    Módosítás
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>

      <Dialog.Root
        open={isUploadDeleteSure}
        onOpenChange={(e) => setIsUploadDeleteSure(e.open)}
      >
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

      <Dialog.Root
        open={isUploadModifySure}
        onOpenChange={(e) => setIsUploadModifySure(e.open)}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.CloseTrigger />
              <Dialog.Header justifyContent="center">
                <Dialog.Title fontSize="xl">Hírdetés Módosítása</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body fontSize="large">
                <div id="update-container">
                  <div id="update-container-first">
                    <label>Név</label>
                    <input
                      value={selectedInsData.name}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedInsData({
                          ...selectedInsData,
                          name: e.target.value,
                        });
                      }}
                    />
                    <label>Ár</label>
                    <input
                      value={selectedInsData.cost}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedInsData({
                          ...selectedInsData,
                          cost: e.target.value,
                        });
                      }}
                    />
                    <label>Leírás</label>
                    <input
                      value={selectedInsData.description}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedInsData({
                          ...selectedInsData,
                          description: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <label>Állapot</label>
                  <RadioGroup.Root
                    defaultValue={selectedInsData.condition}
                    variant="subtle"
                  >
                    <Stack gap="1.5">
                      {radioOptions.map((opt) => (
                        <RadioGroup.Item
                          key={opt.value}
                          value={opt.value}
                          size="md"
                          onChange={(e) => {
                            console.log(e.target.value);
                            setSelectedInsData({
                              ...selectedInsData,
                              condition: e.target.value,
                            });
                          }}
                        >
                          <RadioGroup.ItemHiddenInput />
                          <RadioGroup.ItemIndicator />
                          <RadioGroup.ItemText fontSize="lg">
                            {opt.label}
                          </RadioGroup.ItemText>
                          <InfoTip
                            content={opt.desc}
                            unmountOnExit={true}
                            size={"lg"}
                          />
                        </RadioGroup.Item>
                      ))}
                    </Stack>
                  </RadioGroup.Root>
                  <label>Kiemelt</label>
                  <SegmentGroup.Root width="10" justifySelf="center" margin="5">
                    <SegmentGroup.Indicator />
                    <SegmentGroup.Items
                      items={["Nem", "Igen"]}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setSelectedInsData({
                          ...selectedInsData,
                          isPremium: e.target.value == "Igen",
                        });
                      }}
                    />
                  </SegmentGroup.Root>
                </div>
                <span
                  style={{
                    display: "flex",
                    gap: "1.65rem",
                    justifyContent: "center",
                  }}
                >
                  <button
                    className="uni-button-md"
                    onClick={() => {
                      updateIns(selectedInsData.id);
                      setIsUploadModifySure(false);
                    }}
                  >
                    MÓDOSÍTÁS
                  </button>
                  <button
                    className="uni-button-md"
                    onClick={() => {
                      setIsUploadModifySure(false);
                    }}
                  >
                    MÉGSEM
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
