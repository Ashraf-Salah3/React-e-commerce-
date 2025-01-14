import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import instance from "../../../axios";
import { useNavigate } from "react-router-dom";
import styles from "./orders.module.scss";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [filterOrders, setFilterOrders] = useState({
    PageSize: 10,
    PageIndex: 1,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await instance.get("/Order", { params: filterOrders });
        if (response.status === 200) {
          setOrders(response.data.data.items || []);
          const totalItems = response.data.data.count || 0;

          setTotalPages(Math.ceil(totalItems / filterOrders.PageSize));
        }
      } catch (error) {
        toast.error("Failed to fetch orders:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [filterOrders]);

  const handlePageChange = (pageIndex) => {
    setFilterOrders((prev) => ({
      ...prev,
      PageIndex: pageIndex,
    }));
  };

  const convertData = (order) => {
    const timestamp = order.creationTime;
    const date = new Date(timestamp);

    const formattedDate = date.toLocaleDateString("en-GB");
    const formattedTime = date.toLocaleTimeString("en-GB");

    return `${formattedDate} ${formattedTime}`;
  };

  const handleOrderDetails = async (id) => {
    try {
      const response = await instance.get(`/Order/${id}`);
      navigate(`/admin/orderDetails/${id}`, { state: response.data.data });
    } catch (error) {
      toast.error("Failed to fetch order details:", error.message);
    }
  };
  return (
    <div>
      <div className="main-header">
        <h1>Orders List</h1>
      </div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className="table table-striped table-hover">
          <TableHead className={styles.subhead}>
            <TableRow>
              <TableCell> {"   "}#</TableCell>
              <TableCell>OrderId</TableCell>
              <TableCell>Creation Time</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Client Phone</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order.id} className={styles.subContent}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.id}</TableCell>
                <TableCell>{convertData(order)}</TableCell>
                <TableCell>{order.totalAmount}</TableCell>
                <TableCell>{order.clientName}</TableCell>
                <TableCell>{order.clientPhone}</TableCell>
                <TableCell
                  className={
                    order.status === "تم التجهيز" ? styles.done : styles.still
                  }
                >
                  {order.status}
                </TableCell>
                <TableCell className={styles.details}>
                  <button
                    className="--btn --btn-primary"
                    onClick={() => handleOrderDetails(order.id)}
                  >
                    Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={
              filterOrders.PageIndex === index + 1
                ? `${styles.pageButton} ${styles.activePage}`
                : styles.pageButton
            }
            disabled={loading}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Orders;
