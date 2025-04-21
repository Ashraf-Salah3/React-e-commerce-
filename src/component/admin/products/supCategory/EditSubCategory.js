// EditSubCategoryPage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchCategories } from "../../../../context/FetchCategory";
import MainButton from "../../../mainButton/MainButton";

const EditSubCategory = () => {
  const { categoryId, subCategoryId } = useParams();
  const { subCategories, updateSubCategory } = useFetchCategories();
  const [newSubCategoryName, setNewSubCategoryName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const subCategory = subCategories[categoryId]?.find(
      (sub) => sub.id === parseInt(subCategoryId)
    );
    if (subCategory) {
      setNewSubCategoryName(subCategory.name);
    }
  }, [categoryId, subCategoryId, subCategories]);

  const handleUpdateSubCategory = async () => {
    if (newSubCategoryName.trim() === "") return;

    await updateSubCategory(categoryId, subCategoryId, newSubCategoryName);
    navigate("/admin/subCategories");
  };
  return (
    <div>
      <h1>تعديل الفئة الفرعية</h1>
      <input
        className="--input"
        type="text"
        value={newSubCategoryName}
        onChange={(e) => setNewSubCategoryName(e.target.value)}
        placeholder="اسم الفئة الفرعية الجديدة"
      />
      <div className="--btn-action">
        <MainButton
          value="إلغاء"
          onClick={() => navigate("/admin/subCategories")}
        />
        <MainButton
          value="حفظ"
          type="submit"
          onClick={handleUpdateSubCategory}
        />
      </div>
    </div>
  );
};

export default EditSubCategory;