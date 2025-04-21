import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchCategories } from "../../../../../context/FetchCategory";

import MainButton from "../../../../mainButton/MainButton";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { categories, updatedCategory } = useFetchCategories();
  const [categoryName, setCategoryName] = useState("");
  const [originalName, setOriginalName] = useState("");

  useEffect(() => {
    const category = categories.find((cat) => cat.id === parseInt(id));
    if (category) {
      setCategoryName(category.name);
      setOriginalName(category.name);
    }
  }, [id, categories]);

  const handleSave = () => {
    if (categoryName.trim() && categoryName !== originalName) {
      updatedCategory(id, categoryName);
      navigate("/admin/categories");
    }
  };

  return (
    <div>
      <h1>تعديل الفئة</h1>
      <input
        label="تغيير الفئة"
        type="text"
        className="--input"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
        placeholder="أدخل اسم الفئة"
      />
      <div className="--btn-action">
        <MainButton value="إلغاء" onClick={() => navigate("/admin/categories")} />
        <MainButton 
          value="حفظ" 
          onClick={handleSave} 
          type="submit" 
          disabled={categoryName.trim() === originalName || !categoryName.trim()}
        />
      </div>
    </div>
  );
};

export default EditCategory;