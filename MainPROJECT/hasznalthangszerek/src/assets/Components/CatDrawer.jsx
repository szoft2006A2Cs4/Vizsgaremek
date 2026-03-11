import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import SCatDrawer from "./SCatDrawer";
import axios from "../scripts/axios";

const Drawer_ = ({ open, setOpen, catList = [] }) => {
  const scatURl = "api/Subcategory";

  const [isSDrawerOpen, setIsSDrawerOpen] = useState(true);

  const [filteredData, setFilteredData] = useState([]);

  const [sCats, setSCats] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(scatURl, {
          withCredentials: true,
        });
        setSCats(response.data);
      } catch (err) {
        console.log(err.response);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Drawer.Root
        open={open && isSDrawerOpen}
        onOpenChange={(e) => setOpen(e.open)}
        size="sm"
        placement="start"
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              display="flex"
              flexDirection="column"
              bg="#77625c"
              color="black"
              fontSize="110%"
            >
              <Drawer.Header>
                <Drawer.Title className="Drawer-title">
                  Összes kategória
                </Drawer.Title>
              </Drawer.Header>
              <Drawer.Body className="Drawer-body">
                {catList.map((e) => (
                  <div key={e.id}>
                    <a
                      className="Drawer-links"
                      onClick={() => {
                        setFilteredData(
                          sCats.filter((val) => val.cName == e.name),
                        );
                        setIsSDrawerOpen(false);
                      }}
                    >
                      <h3>{e.name}</h3>
                    </a>
                  </div>
                ))}
              </Drawer.Body>
              <Drawer.Footer></Drawer.Footer>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>

      {isSDrawerOpen ? (
        <SCatDrawer
          open={isSDrawerOpen}
          setOpen={setIsSDrawerOpen}
          sCatList={filteredData}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Drawer_;
