import { Button, Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";

const PasswordPopUp = ({ isopen, anchorRef }) => {
  if (!isopen) return null;
  return (
    <Popover.Root
      open={isopen}
      initialFocusEl={() => anchorRef.current}
      autoFocus={false}
      restoreFocus={false}
      closeOnBlur={false}
      positioning={{ placement: "right", gutter: 10 }}
    >
      <Popover.Anchor virtualRef={anchorRef} />
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
