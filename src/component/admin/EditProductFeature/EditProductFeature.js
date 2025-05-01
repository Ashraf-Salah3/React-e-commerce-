import React, {  useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../axios";
import styles from "./edit-product-feature.module.scss";
import InputField from "../../inputGroup/InputField";
import { useFetchCategories } from "../../../context/FetchCategory";
import { useProducts } from "../../../context/FetchProduct";
import MainButton from "../../mainButton/MainButton";
import { GoUpload } from "react-icons/go";

import AddSize from "./addSize/AddSize";

const EditProductFeature = () => {
  const { categories } = useFetchCategories();
  const { setProductFilter, productFilter, products, getProductColor, colors } =
    useProducts();
  
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [color, setColor] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
    const [loading , setLoading] = useState(false)
  

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setProductFilter({
      ...productFilter,
      CategoryId: value || null,
    });
    setSelectedCategory(value);
    setSelectedProduct("");
  };

  const handleProductChange = (e) => {
    const { value } = e.target;
    setSelectedProduct(value);
    if (value) {
      getProductColor(value); 
    } else {
      
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProduct || !color || !coverImg) {
      toast.error("Pيرجى ملء جميع الحقول المطلوبة.");
      return;
    }
setLoading(true)
    const formData = new FormData();
    formData.append("ProductId", selectedProduct);
    formData.append("Color", color);
    if (coverImg) {
      formData.append("ColorImage", coverImg);
    }

    try {
       await instance.post("/Product/Productcolor", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      getProductColor(selectedProduct); // Fetch colors again after submitting
      toast.success("تم تحديث ميزة المنتج بنجاح!");
      setColor("")
      setCoverImg(null)
      setProductFilter("")
      setLoading(false)
    } catch (error) {
      toast.error(`خطأ في تحديث ميزة المنتج: ${error.message}`);
      setLoading(false)
    }
  };

  return (
    <div>
      <div className={styles["edit-product"]}>
        {/* Header Section */}
        <div className="main-header">
          <h1>إضافة لون للمنتج</h1>
        </div>

        {/* Form Section */}
        <div className={styles.form}>
          <div className={styles["product-info"]}>
            <div className={styles.getProduct}>
              <InputField
                label="الفئة"
                id="CategoryId"
                type="select"
                options={[
                  { value: "", label: "اختر فئة" },
                  ...categories?.map((category) => ({
                    value: category.id,
                    label: category.name,
                  })),
                ]}
                value={selectedCategory}
                onchange={handleCategoryChange}
              />
              <InputField
                label="المنتج"
                id="products"
                type="select"
                options={
                  selectedCategory
                    ? [
                        { value: "", label: "اختر منتج" },
                        ...products?.map((product) => ({
                          value: product.id,
                          label: product.name,
                        })),
                      ]
                    : [{ value: "", label: "يرجى اختيار فئة" }]
                }
                value={selectedProduct}
                onchange={handleProductChange}
              />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={styles.colors}>
              <InputField
                label="الألوان"
                id="Colors"
                type="select"
                options={
                  selectedProduct
                    ? [
                        { value: "", label: "Choose a color" },
                        ...colors?.map((color) => ({
                          value: color.id,
                          label: color.color,
                        })),
                      ]
                    : [{ value: "", label: "Please Choose Product" }]
                }
                onchange={(e) => setSelectedColor(e.target.value)}
                value={selectedColor}
              />
              <InputField
                label="Add Color"
                type="text"
                id="Color"
                required
                value={color}
                onchange={(e) => setColor(e.target.value)}
              />
              <div className={styles["image-upload-section"]}>
                <div
                  className={`${styles["image-upload"]} ${styles.cover}`}
                  style={{ border: coverImg && "none" }}
                >
                  <label htmlFor="coverImg">
                    <input
                      type="file"
                      id="coverImg"
                      onChange={handleImageChange}
                      accept=".png, .jpg, .jpeg"
                      hidden
                      required
                    />
                    <div
                      className={styles.productPicture}
                      style={{
                        backgroundImage: coverImg
                          ? `url(${URL.createObjectURL(coverImg)})`
                          : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      {!coverImg && (
                        <div>
                          <GoUpload />
                          <h4>
                          اسحب وأفلت أو <span>اختر ملف</span> لتحميل صورة الغلاف
                          </h4>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="--btn-action">
              <MainButton value="حفظ" type="submit" loading = {loading}/>
            </div>
          </form>
        </div>
      </div>
      <AddSize productColorId={selectedColor} />
    </div>
  );
};

export default EditProductFeature;
