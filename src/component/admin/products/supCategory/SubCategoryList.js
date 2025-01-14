import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useFetchCategories } from "../../../../context/FetchCategory";
import { useNavigate } from "react-router-dom";
import styles from "./subCategoryList.module.scss";

const SubCategoryList = () => {
  const { categories, subCategories, deleteSubCategory } = useFetchCategories();
  const navigate = useNavigate();

  return (
    <div>
      <div className="main-header">
        <h1>Sub Categories</h1>
        <div>
          <button
            className="--btn --btn-primary"
            onClick={() => navigate("/admin/addNewSubCategory")}
          >
            <FaPlus />
            Add New
          </button>
        </div>
      </div>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className="table table-striped table-hover">
          <TableHead className={styles.subhead}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell>SubCategories</TableCell>
              <TableCell>Edit sub Category</TableCell>
              <TableCell>Delete sub Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index} className={styles.subContent}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>

                <TableCell className={styles.subcat}>
                  {subCategories[category.id] &&
                    subCategories[category.id].map((subCategory,index) => (
                      <div key={index}>{subCategory.name}</div>
                    ))}
                </TableCell>
                <TableCell className={styles.edit}>
                  {subCategories[category.id] &&
                    subCategories[category.id].map((subCategory,index) => {
                      return (
                        <button
                          key={index}
                          className="--btn --btn-primary"
                          onClick={() => {
                            navigate(
                              `/admin/editSubCategory/${category.id}/${subCategory.id}`
                            );
                          }}
                        >
                          Edit
                        </button>
                      );
                    })}
                </TableCell>

                <TableCell className={styles.delete}>
                  {subCategories[category.id] &&
                    subCategories[category.id].map((subCategory,index) => (
                      <button
                        key={index}
                        className="--btn --btn-danger"
                        onClick={() =>
                          deleteSubCategory(category.id, subCategory.id)
                        }
                      >
                        Delete
                      </button>
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SubCategoryList;
