import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import SCatDrawer from "./SCatDrawer";

const Drawer_ = ({ open, setOpen, catList = [] }) => {
  const scatURl = "api/Subcategory";

  const [sCatOpen, setSCatOpen] = useState(false);
  const [isSDrawerOpen, setIsSDrawerOpen] = useState(false);

  const [filterOnClick, setFilterOnClick] = useState(false);
  const [filterCond, setFilterCond] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [sCats, setSCats] = useState([]);

  const setFilterDeps = (e) => {
    setFilterCond(e.target.value);
  };

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

  useEffect(() => {
    setFilteredData(sCats.filter((val) => val.areas.includes(filterCond)));
    console.log(filteredData);
  }, [filterOnClick]);

  return (
    <>
      <Drawer.Root
        open={open}
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
                      onClick={(e) => {
                        setFilterDeps(e);
                        setFilterOnClick(true);
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

      {sCatOpen ? (
        <SCatDrawer
          open={isDrawerOpen}
          setOpen={setIsDrawerOpen}
          sCatList={categories}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Drawer_;
