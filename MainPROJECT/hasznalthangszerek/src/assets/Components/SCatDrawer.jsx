import { Button, CloseButton, Drawer, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Drawer_ = ({ open, setOpen, sCatList }) => {
  const navigate = useNavigate();

  const navigateTo = (e) => {
    navigate(`/instruments?category=${e.cName}&subcategory=${e.name}`, {
      replace: true,
    });
  };

  return (
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
                Összes alkategória
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body className="Drawer-body">
              {sCatList.map((e) => (
                <div key={e.id}>
                  <a className="Drawer-links" onClick={() => navigateTo(e)}>
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
  );
};

export default Drawer_;
