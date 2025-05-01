import React, { useState } from "react";
import styles from "../categories/catedories.module.scss";
import { useFetchCategories } from "../../../../context/FetchCategory";
import { useNavigate } from "react-router-dom";
const AddNewSubCategory = () => {
  const { AddNewSubCategory, categories } = useFetchCategories();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newSubCategory, setNewSubCategory] = useState("");
   const [loading, setLoaging] = useState(false)
  
  const navigate = useNavigate();


  const handleSubCategorySubmit = (e) => {
    e.preventDefault();
    setLoaging(true)
    AddNewSubCategory(selectedCategory, newSubCategory);
    setLoaging(false)
  };

  return (
    <div className={styles.categoriesDetails}>
      <h1>إضافة فئة فرعية جديدة</h1>
      <form onSubmit={handleSubCategorySubmit}>
        <div className={styles.categoryInputGroup}>
          <select
            id="CategoryId"
            required
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="--input"
          >
            <option value="" disabled>
              اختر فئة
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          <input
            label="الفئة الفرعية"
            id="subCategory"
            placeholder="أضف فئة فرعية جديدة"
            required
            type="text"
            onChange={(e) => setNewSubCategory(e.target.value)}
            value={newSubCategory}
            className="--input"
          />
        </div>
        <div className="--btn-action">
          <button
            className="--btn --btn-small --btn-secondary"
            type="button"
            onClick={() => navigate("/admin/subcategories")}
          >
            إلغاء
          </button>
          <button className="--btn --btn-primary --btn-small" type="submit" onClick={()=>navigate("/admin/subcategories")}>
            {loading ? "loaging" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewSubCategory;