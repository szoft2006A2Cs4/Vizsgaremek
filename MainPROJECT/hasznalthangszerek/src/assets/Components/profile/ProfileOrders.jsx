import React, { useState } from "react";
import axios from "../../scripts/axios";

async function getOrderList() {
  try {
    setIsLoading(true);
    const response = axios.get();
  } catch (err) {
    console.log(err);
  }
}

const ProfileOrders = ({ user }) => {
  const [editEnabled, setEditEnabled] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ORDER_URL = `/api/OrderInfo/${user.id}`;

  const orderlist = [];

  return <></>;
};

export default ProfileOrders;
