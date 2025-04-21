import React, { useEffect, useState } from "react";
import styles from "./add-size.module.scss";
import InputField from "../../../inputGroup/InputField";
import instance from "../../../../axios";
import { toast } from "react-toastify";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useProducts } from "../../../../context/FetchProduct";

const AddSize = ({ productColorId }) => {
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [size, setSize] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const { sizes, getSize } = useProducts();
  const [showPopup, setShowPopup] = useState(false);
  const [editSizeId, setEditSizeId] = useState("")
  const [editForm, setEditForm] = useState({
    editPrice: "",
    editQuantity: "",
    editSize:""
  });

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.post("/Product/sizes", {
        price,
        quantity,
        size,
        productColorId,
        costPrice,
      });

      if (response.status === 200) {
        toast.success("تم إضافة الحجم بنجاح");

        getSize(productColorId);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      const response = await instance.delete(`/Product/sizes/${id}`);
      if (response.status === 200) {
        toast.success("تم حذف الحجم بنجاح");
        getSize(productColorId);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleEdit = ( size) => {
    setEditSizeId(size.id);
    setEditForm({
      editPrice: size.price,
      editQuantity: size.quantity,
      editSize:size.size
    });
    setShowPopup(true);
  };

  const handleEditInputChange = (e) => {
    const { id, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.put(`/Product/sizes/${editSizeId}`, {
        price: editForm.editPrice,
        quantity: editForm.editQuantity,
        Size: editForm.editSize
      });

      if (response.status === 200) {
        toast.success("تم تحديث الحجم بنجاح!");
        getSize(productColorId);
        setShowPopup(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSize(productColorId);
  }, [productColorId]);

  return (
    <div>
      <div className={styles.categoriesDetails}>
        <h1>Add New Size</h1>
        <form onSubmit={handelFormSubmit}>
          <div className={styles.categoryInputGroup}>
            <InputField
              label="سعر التكلفة"
              type="text"
              id="costprice"
              required
              value={costPrice}
              onchange={(e) => setCostPrice(e.target.value)}
            />
            <InputField
              label="سعر البيع"
              type="text"
              id="price"
              value={price}
              onchange={(e) => setPrice(e.target.value)}
            />
            <InputField
              label="الكمية"
              type="text"
              id="quantity"
              required
              value={quantity}
              onchange={(e) => setQuantity(e.target.value)}
            />
            <InputField
              label="الحجم"
              type="text"
              id="size"
              required
              value={size}
              onchange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="--btn-action">
            <button className="--btn --btn-small --btn-secondary" type="button">
            إلغاء
            </button>
            <button className="--btn --btn-primary --btn-small" type="submit">
            حفظ
            </button>
          </div>
        </form>
      </div>
      <div className={styles.sizes}>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table className="table table-striped table-hover">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: ".7rem" }}>#</TableCell>
                <TableCell>
                  <div>colorId</div>
                </TableCell>
                <TableCell>
                  <div>الحجم</div>
                </TableCell>
                <TableCell>
                  <div>سعر البيع</div>
                </TableCell>
                <TableCell>
                  <div>سعر التكلفة</div>
                </TableCell>
                <TableCell>
                  <div>الكمية</div>
                </TableCell>
                <TableCell>
                  <div>تعديل الحجم</div>
                </TableCell>
                <TableCell>
                  <div>حذف الحجم</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sizes.map((size, index) => (
                <TableRow key={size.id} className={styles.tableRow}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{size.productColorId}</TableCell>
                  <TableCell>{size.size}</TableCell>
                  <TableCell>{size.price}</TableCell>
                  <TableCell>{size.costPrice}</TableCell>
                  <TableCell>{size.quantity}</TableCell>
                  <TableCell className={styles.edit}>
                    <button
                      className="--btn --btn-primary"
                      onClick={() => handleEdit(size)}
                    >
                      تعديل
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      className="--btn --btn-danger"
                      onClick={() => handleDelete(size.id)}
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
      {showPopup && (
        <div
          className={styles["popup-overlay"]}
          onClick={() => setShowPopup(false)}
        >
          <div
            className={styles["popup-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleEditFormSubmit}>
              <InputField
                label="تعديل السعر"
                type="text"
                id="editPrice"
                value={editForm.editPrice}
                onchange={handleEditInputChange}
              />
              <InputField
                label="تعديل الكمية"
                type="text"
                id="editQuantity"
                value={editForm.editQuantity}
                onchange={handleEditInputChange}
              />
                <InputField
                label="تعديل الكمية"
                type="text"
                id="editSize"
                value={editForm.editSize}
                onchange={handleEditInputChange}
              />
              <div className="--btn-action">
                <button
                  className="--btn --btn-small --btn-secondary"
                  type="button"
                  onClick={() => setShowPopup(false)}
                >
                  إلغاء
                </button>
                <button className="--btn --btn-primary --btn-small" type="submit">
                حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSize;
