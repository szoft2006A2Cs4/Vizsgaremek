import { Dialog, Portal } from "@chakra-ui/react";

const ASzF = ({ open }) => {
  return (
    <Dialog.Root open={open}>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title />
          </Dialog.Header>
          <Dialog.Body />
          <Dialog.Footer />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ASzF;
