import React, { useEffect, useState } from "react";
import axios from "../../scripts/axios";
import Loading from "../Loading";
import { Table } from "@chakra-ui/react";

const ProfileUploads = ({ insList }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      {isLoading ? <Loading /> : <></>}
      <Table.ScrollArea borderWidth="1px" rounded="md" height="160px">
        <Table.Root size="sm" stickyHeader>
          <Table.Header>
            <Table.Row bg="bg.subtle">
              <Table.ColumnHeader>Termék neve</Table.ColumnHeader>
              <Table.ColumnHeader>Kategória</Table.ColumnHeader>
              <Table.ColumnHeader>Ár</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="end">Állapot</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {insList.map((item) => (
              <Table.Row key={item.id}>
                <Table.Cell>{item.name}</Table.Cell>
                <Table.Cell>{item.subCategory.cName}</Table.Cell>
                <Table.Cell>{item.cost}</Table.Cell>
                <Table.Cell textAlign="end">
                  {item.sold ? "ELadva" : "Nincs eladva"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </>
  );
};

export default ProfileUploads;
