import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import React, { useContext } from "react";

const Drawer_ = ({ open, setOpen, catList = [] /*isLoading */ }) => {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      size="sm"
      placement="start"
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
