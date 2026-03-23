import { Dialog, DataList, CloseButton } from "@chakra-ui/react";

export default function ForYou({isOpen}){

    return( 
    <Dialog.Root open={isOpen}>
        <Portal>
            
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Kedvelt típusok</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body pb="8">
                <DataList.Root orientation="horizontal">

                </DataList.Root>
              </Dialog.Body>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        
        </Portal>
    </Dialog.Root>)
}