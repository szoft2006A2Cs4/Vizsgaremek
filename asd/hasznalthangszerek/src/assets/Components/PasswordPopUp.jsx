import { Button, Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";

const PasswordPopUp = ({ isopen }) => {
  if (!isopen) return null;
  return (
    <Popover.Root
      open={isopen}
      autoFocus={false}
      restoreFocus={false}
      closeOnBlur={false}
    >
      <Portal>
        <Popover.Positioner>
          <Popover.Content width="25rem">
            <Popover.Arrow />
            <Popover.Body>
              <h2>Jelszó követelmények:</h2> <br />
              <ul>
                <li>Legalább 8 karakter hosszú legyen.</li>
                <li>Legalább 1 nagy ÉS kisbetű.</li>
                <li>Legalább 1 speciális karakter.</li>
              </ul>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

export default PasswordPopUp;
