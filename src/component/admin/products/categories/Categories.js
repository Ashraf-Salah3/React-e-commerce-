import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {useFetchCategories} from "../../../../context/FetchCategory"
import styles from "./catedories.module.scss"
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Categories = () => {
  const { categories, deleteCategory } = useFetchCategories();
   const navigate = useNavigate()

  const handleDelete = (id) => {
    deleteCategory(id);
  };
  return (
    <div>
          <div className="main-header">
        <h1>Categories</h1>
        <div>
          <button className="--btn --btn-primary" onClick={()=>navigate("/admin/addNewCategory")}>
            <FaPlus />
            Add New
          </button>
        </div>
      </div>
    <TableContainer component={Paper} className={styles.tableContainer}>
        <Table className="table table-striped table-hover">
          <TableHead className={styles.subhead}>
            <TableRow>
              <TableCell style={{ width: ".7rem" }}>#</TableCell>
              <TableCell>
                {" "}
                <div>
                  Name 
                </div>
              </TableCell>
              <TableCell>
                <div>
                  Id 
                </div>
              </TableCell>
              <TableCell>
                <div>
                Edit Category 
                </div>
              </TableCell>
              <TableCell>
                <div>
                  Delete Category
                </div>
              </TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
            {categories.map((category, index) => (
              <TableRow key={category.id}  className={styles.subContent}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.id}</TableCell>
                <TableCell  className={styles.edit}><button className="--btn --btn-primary"  onClick={() => navigate(`/admin/categories/edit/${category.id}`)}>Edit</button></TableCell>
                <TableCell className={styles.delete}><button className="--btn --btn-danger" onClick={()=> handleDelete(category.id)}>Delete</button></TableCell>
                </TableRow>))}
                </TableBody>
              </Table>
              </TableContainer>
    </div>
  )
}

export default Categories