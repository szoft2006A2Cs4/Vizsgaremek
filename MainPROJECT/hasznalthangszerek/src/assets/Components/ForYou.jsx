import { Dialog, DataList, CloseButton, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../scripts/axios";

export default function ForYou({ forYouList, open, onClose }) {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Kedvelt típusok</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="8">
              {forYouList == undefined ? (
                "Még nincs kedvelt kategóriája!"
              ) : (
                <DataList.Root orientation="horizontal">
                  {forYouList.map((item, index) => (
                    <DataList.Item key={index}>
                      <DataList.ItemValue>{item}</DataList.ItemValue>
                    </DataList.Item>
                  ))}
                </DataList.Root>
              )}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
