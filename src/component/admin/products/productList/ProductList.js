import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import styles from "./productList.module.scss";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { asyndingIcon, exportIcon } from "../../../../assets";
import instance from "../../../../axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const [activeTab, setActiveTab] = useState("Published Products");
  const [products, setProducts] = useState([]);
  const navegate = useNavigate();

  const deleteProductHandel = async (id) => {
    try {
      const res = await instance.delete(`/Product/${id}`);
      if (res) {
        setProducts(products.filter((item) => item.id !== id));
        toast.success(`product is deleted`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const editProductHandel = (product) => {
    navegate("/admin/editProduct", { state: { product } });
  };
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Products List", 14, 10);
    const tableColumn = [
      "#",
      "Name",
      "Description",
      "Size",
      "Price",
      "Color",
      "Quantity",
      "Date",
      "Time",
      "Status",
    ];
    const tableRows = [];
    products.forEach((product, index) => {
      const productData = [
        index + 1,
        product.name,
        product.description,
        product.size,
        product.price,
        product.color,
        product.quantity,
        product.scheduleDate,
        product.time,
        product.isActive,
      ];
      tableRows.push(productData);
    });
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
    doc.save("Products_List.pdf");
  };

  const fetchProduct = (isActive) => {
    instance
      .get("/Product", { params: { isActive } })
      .then((res) => {
        setProducts(res?.data?.data.items);
        setActiveTab(
          isActive === true ? "Published Products" : "Scheduled Products"
        );
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };
  useEffect(() => {
    fetchProduct(true);
  }, []);

  return (
    <div className={styles.productList}>
      <div className={styles.header}>
        <h1>Products List</h1>

        <div className={styles.actions}>
          <button onClick={() => navegate("/admin/newProduct")}>
            create New Product
          </button>

          <button onClick={exportPDF}>
            <img src={exportIcon} alt="" /> Export
          </button>
          {/*<button
            onClick={() => {
              filterHandler("blue");
            }}
          >
            <img src={filterIcon} alt="" /> Filter
          </button>*/}
        </div>
      </div>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <div className={styles.tabs}>
          <h4
            className={activeTab === "Published Products" ? styles.active : ""}
            onClick={() => fetchProduct(true)}
          >
            Published Products
          </h4>
          <h4
            className={activeTab === "Scheduled Products" ? styles.active : ""}
            onClick={() => fetchProduct(false)}
          >
            Scheduled Products
          </h4>
        </div>
        <Table className="table table-striped table-hover">
          <TableHead className={styles.subhead}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <div>Image Cover</div>
              </TableCell>
              <TableCell>
                {" "}
                <div>
                  Name <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>

              <TableCell>
                <div>
                  Description <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>

              <TableCell>
                <div>
                  {" "}
                  Date <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  Price <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>
                {/*{activeTab === "Scheduled Products" && (
              <TableCell>
                  <div>
                    {" "}
                    Time <img src={asyndingIcon} alt="" />
                  </div>
                </TableCell>
              )}*/}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <TableRow key={product.id} className={styles.subContent}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <img src={product.imageCover} alt="" />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.scheduleDate}</TableCell>
                <TableCell>{product.price}</TableCell>
                {/*{activeTab === "Scheduled Products" && (
                  <TableCell>{}</TableCell>
                )}*/}
                <TableCell
                  onClick={() => editProductHandel(product)}
                  className={styles.edit}
                >
                  <button className="--btn --btn-primary">Edit</button>
                </TableCell>
                <TableCell className={styles.delete}>
                  <button
                    className="--btn --btn-danger"
                    onClick={() => deleteProductHandel(product.id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
