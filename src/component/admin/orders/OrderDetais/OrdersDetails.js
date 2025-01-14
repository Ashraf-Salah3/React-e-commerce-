import { useLocation } from "react-router-dom";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import styles from "./orderDetails.module.scss";
import React from "react";
import instance from "../../../../axios";
import { toast } from "react-toastify";

const OrdersDetails = () => {
  const location = useLocation();
  const order = location.state;

  const convertData = () => {
    const timestamp = order.creationTime;
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString("en-GB");
    const formattedTime = date.toLocaleTimeString("en-GB");

    return `${formattedDate} ${formattedTime}`;
  };
  const handleButtonClick = async () => {
    try {
      await instance.put(`/Order/${order.id}`);
      toast.success("تم تجهيز الطلب");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div className={styles.orderDetails}>
        <div className={styles.clientInfo}>
          <h3>Client Info</h3>
          <p>
            <span>ClientName : </span>
            {order.clientName}
          </p>
          <p>
            <span> ClientPhone : </span>
            {order.clientPhone}
          </p>
          <p>
            <span> CreationTime : </span>
            {convertData()}
          </p>
        </div>
        <div className={styles.orderInfo}>
          <h3>Order Cost</h3>
          <p>
            <span>ShippmentCost : </span>
            {order.shippmentCost}
          </p>
          <p>
            <span>TotalItemsCost : </span>
            {order.totalItemsCost}
          </p>
          <p>
            <span>TotalAmount : </span>
            {order.totalAmount}
          </p>
          <p>
            <span>TrackingNumber : </span>
            {order.trackingNumber}
          </p>
        </div>
        <div>
          <button
            className={`--btn --btn-primary ${
              order.status === "تم التجهيز" ? styles.disabledButton : ""
            }`}
            onClick={handleButtonClick}
            disabled={order.status === "تم التجهيز"}
          >
            {order.status === "تم التجهيز" ? "تم تجهيز الطلب" : "إتمام التجهيز"}
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className="table table-striped table-hover">
          <TableHead className={styles.subhead}>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Product ID</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.items.map((item, index) => (
              <TableRow key={index} className={styles.subContent}>
                <TableCell>
                  <img src={item.imageUrl} alt="" />
                </TableCell>
                <TableCell>{item.productId}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersDetails;
