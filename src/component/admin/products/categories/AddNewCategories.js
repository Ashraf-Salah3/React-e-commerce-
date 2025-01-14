import { FaPlus } from "react-icons/fa";
import styles from "./catedories.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCategories } from "../../../../context/FetchCategory";

const AddNewCategories = () => {
  const [mainCategory, setMainCategory] = useState("");
  const navigate = useNavigate();
  const {  addCategory } = useFetchCategories();

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    await addCategory(mainCategory); 
    setMainCategory(""); 
    navigate("/admin/categories")
  };

 

  return (
    <div className={styles.categories}>
      <div className="main-header">
        <h1>Categories</h1>
        <button className="--btn --btn-primary">
          <FaPlus />
          Add New
        </button>
      </div>

      {/* Main Category Section */}
      <div className={styles.categoriesDetails}>
        <h1>Add New Category</h1>
        <form onSubmit={handleCategorySubmit}>
          <div className={styles.categoryInputGroup}>
            <input
              label="Main Category"
              id="mainCategory"
              required
              type="text"
              onChange={(e) => setMainCategory(e.target.value)}
              value={mainCategory}
              className="--input"
            />
          </div>
          <div className="--btn-action">
            <button
              className="--btn --btn-small --btn-secondary"
              type="button"
              onClick={() => navigate("/admin/categories")}
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
  );
};

export default AddNewCategories;
