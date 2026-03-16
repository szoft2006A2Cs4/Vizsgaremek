import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import SCatDrawer from "./SCatDrawer";
import axios from "../scripts/axios";

const Drawer_ = ({ open, setOpen, catList, scats, loading }) => {
  const [isSDrawerOpen, setIsSDrawerOpen] = useState(false);

  const [filteredData, setFilteredData] = useState([]);

  if (loading || catList === undefined) return null;

  const cats = [];
  for (var c of catList) {
    cats.push(c);
  }

  return (
    <>
      <Drawer.Root
        open={open && !isSDrawerOpen}
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
                {cats.map((e) => (
                  <div key={e.id}>
                    <a
                      className="Drawer-links"
                      onClick={() => {
                        setFilteredData(scats.filter((val) => val.cName == e));
                        setIsSDrawerOpen(true);
                      }}
                    >
                      <h3>{e}</h3>
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
