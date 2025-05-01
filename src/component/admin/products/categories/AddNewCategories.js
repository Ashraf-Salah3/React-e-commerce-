import { FaPlus } from "react-icons/fa";
import styles from "./catedories.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchCategories } from "../../../../context/FetchCategory";

const AddNewCategories = () => {
  const [mainCategory, setMainCategory] = useState("");
  const navigate = useNavigate();
  const { addCategory } = useFetchCategories();
 const [loading, setLoaging] = useState(false)
  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    setLoaging(true)
    try{
    await addCategory(mainCategory);
    setMainCategory("");
    setLoaging(true)
   
    }catch{
      setLoaging(false)
    }
    
  };

  return (
    <div className={styles.categories}>
      <div className="main-header">
        <h1>الفئات</h1>
        <button className="--btn --btn-primary">
          <FaPlus />
          إضافة جديد
        </button>
      </div>

      {/* قسم الفئة الرئيسية */}
      <div className={styles.categoriesDetails}>
        <h1>إضافة فئة جديدة</h1>
        <form onSubmit={handleCategorySubmit}>
          <div className={styles.categoryInputGroup}>
            <input
              label="الفئة الرئيسية"
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
              إلغاء
            </button>
            <button className="--btn --btn-primary --btn-small" type="submit">
              {!loading ? "Save" : "loaging"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewCategories;