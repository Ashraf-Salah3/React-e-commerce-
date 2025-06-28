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

    const fetchProduct = (isActive) => {
    instance
      .get("/Product", { params: { isActive } })
      .then((res) => {
        setProducts(res?.data?.data.items);
        setActiveTab(
          isActive === true ? "المنتجات المنشورة" : "المنتجات المجدولة"
        );
      })
      .catch((error) => {
        toast.error(error.data.message);
      });
  };
  useEffect(() => {
    fetchProduct(true);
  }, []);

  const deleteProductHandel = async (id) => {
    try {
      const res = await instance.delete(`/Product/${id}`);
      if (res) {
        setProducts(products.filter((item) => item.id !== id));
        toast.success(`تم حذف المنتج`);
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
    doc.text("قائمة المنتجات", 14, 10);
    const tableColumn = [
      "#",
      "الاسم",
      "الوصف",
      "الحجم",
      "السعر",
      "اللون",
      "الكمية",
      "التاريخ",
      "الوقت",
      "الحالة",
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
    doc.save("قائمة_المنتجات.pdf");
  };



  return (
    <div className={styles.productList}>
      <div className={styles.header}>
        <h1>قائمة المنتجات</h1>

        <div className={styles.actions}>
          <button onClick={() => navegate("/admin/newProduct")}>
            إنشاء منتج جديد
          </button>

          <button onClick={exportPDF}>
            <img src={exportIcon} alt="" /> تصدير
          </button>
          {/*<button
            onClick={() => {
              filterHandler("blue");
            }}
          >
            <img src={filterIcon} alt="" /> تصفية
          </button>*/}
        </div>
      </div>

      <TableContainer component={Paper} className={styles.tableContainer}>
        <div className={styles.tabs}>
          <h4
            className={activeTab === "المنتجات المنشورة" ? styles.active : ""}
            onClick={() => fetchProduct(true)}
          >
            المنتجات المنشورة
          </h4>
          <h4
            className={activeTab === "المنتجات المجدولة" ? styles.active : ""}
            onClick={() => fetchProduct(false)}
          >
            المنتجات المجدولة
          </h4>
        </div>
        <Table className="table table-striped table-hover">
          <TableHead className={styles.subhead}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>
                <div>صورة الغلاف</div>
              </TableCell>
              <TableCell>
                {" "}
                <div>
                  الاسم <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>

              <TableCell>
                <div>
                  الوصف <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>

              <TableCell>
                <div>
                  {" "}
                  التاريخ <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>
              <TableCell>
                <div>
                  السعر <img src={asyndingIcon} alt="" />
                </div>
              </TableCell>
                {/*{activeTab === "المنتجات المجدولة" && (
              <TableCell>
                  <div>
                    {" "}
                    الوقت <img src={asyndingIcon} alt="" />
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
                {/*{activeTab === "المنتجات المجدولة" && (
                  <TableCell>{}</TableCell>
                )}*/}
                <TableCell
                  onClick={() => editProductHandel(product)}
                  className={styles.edit}
                >
                  <button className="--btn --btn-primary">تعديل</button>
                </TableCell>
                <TableCell className={styles.delete}>
                  <button
                    className="--btn --btn-danger"
                    onClick={() => deleteProductHandel(product.id)}
                  >
                    حذف
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