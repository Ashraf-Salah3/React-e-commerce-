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
        toast.success("Add Size Sucess");

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
        toast.success("sizes id deleted sucessful");
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
        toast.success("Size updated successfully!");
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
              label="Cost Price"
              type="text"
              id="costprice"
              required
              value={costPrice}
              onchange={(e) => setCostPrice(e.target.value)}
            />
            <InputField
              label="Sale Price"
              type="text"
              id="price"
              value={price}
              onchange={(e) => setPrice(e.target.value)}
            />
            <InputField
              label="Quantity"
              type="text"
              id="quantity"
              required
              value={quantity}
              onchange={(e) => setQuantity(e.target.value)}
            />
            <InputField
              label="Size"
              type="text"
              id="size"
              required
              value={size}
              onchange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="--btn-action">
            <button className="--btn --btn-small --btn-secondary" type="button">
              Cancel
            </button>
            <button className="--btn --btn-primary --btn-small" type="submit">
              Save
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
                  <div>size</div>
                </TableCell>
                <TableCell>
                  <div>Sale Price</div>
                </TableCell>
                <TableCell>
                  <div>Cost Price</div>
                </TableCell>
                <TableCell>
                  <div>Quantity</div>
                </TableCell>
                <TableCell>
                  <div>Edit Size</div>
                </TableCell>
                <TableCell>
                  <div>Delete Size</div>
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
                      Edit
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      className="--btn --btn-danger"
                      onClick={() => handleDelete(size.id)}
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
                label="Edit Price"
                type="text"
                id="editPrice"
                value={editForm.editPrice}
                onchange={handleEditInputChange}
              />
              <InputField
                label="Edit Quantity"
                type="text"
                id="editQuantity"
                value={editForm.editQuantity}
                onchange={handleEditInputChange}
              />
                <InputField
                label="Edit Size"
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
                  Cancel
                </button>
                <button className="--btn --btn-primary --btn-small" type="submit">
                  Save
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
