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
          <h3>معلومات العميل</h3>
          <p>
            <span>اسم العميل: </span>
            {order.clientName}
          </p>
          <p>
            <span> رقم الهاتف: </span>
            {order.clientPhone}
          </p>
          <p>
            <span> تاريخ الإنشاء: </span>
            {convertData()}
          </p>
        </div>
        <div className={styles.orderInfo}>
          <h3>تكلفة الطلب</h3>
          <p>
            <span>تكلفة الشحن: </span>
            {order.shippmentCost}
          </p>
          <p>
            <span>إجمالي تكلفة المنتجات: </span>
            {order.totalItemsCost}
          </p>
          <p>
            <span>إجمالي المبلغ: </span>
            {order.totalAmount}
          </p>
          <p>
            <span>رقم التتبع:  </span>
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
              <TableCell>الصورة</TableCell>
              <TableCell>رقم المنتج</TableCell>
              <TableCell>اسم المنتج</TableCell>
              <TableCell>الكمية</TableCell>
              <TableCell>المقاس</TableCell>
              <TableCell>اللون</TableCell>
              <TableCell>السعر الإجمالي</TableCell>
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
