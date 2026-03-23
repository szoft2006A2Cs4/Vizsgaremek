import { Dialog, DataList, CloseButton, Portal } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "../scripts/axios";

export default function ForYou() {
  return (
    <Dialog.Root open>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Kedvelt típusok</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="8">
              <DataList.Root orientation="horizontal">
                {forYouList.map((item, index) => (
                  <DataList.Item key={index}>
                    <DataList.ItemValue>{item}</DataList.ItemValue>
                  </DataList.Item>
                ))}
              </DataList.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton
                size="sm"
                onClick={() => {
                  open = false;
                }}
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
