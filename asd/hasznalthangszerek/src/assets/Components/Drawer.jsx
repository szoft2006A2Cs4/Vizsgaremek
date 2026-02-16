import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import React, { useContext } from "react";

const Drawer_ = ({ open, setOpen, catList }) => {
  return (
    <Drawer.Root
      placement={"start"}
      size="sm"
      onOpenChange={(e) => {
        setOpen(e.open);
      }}
      open={open}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner padding="3">
          <Drawer.Content
            rounded="md"
            display="flex"
            flexDirection="column"
            maxH="calc(100vh - 32px)"
            bg="#77625c"
          >
            <Drawer.Header>
              <Drawer.Title>Összes kategória</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              {catList.map((e) => (
                <p>e</p>
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
  );
};

export default Drawer_;
