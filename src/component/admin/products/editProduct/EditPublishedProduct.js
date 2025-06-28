
import styles from "./edit-product.module.scss";
import { priceIcon } from "../../../../assets";
import InputField from "../../../inputGroup/InputField"
import MainButton from "../../../mainButton/MainButton";

import { useState } from "react";
import instance from "../../../../axios";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const EditPublishedProduct = () => {
  
  const { state } = useLocation(); 
  const product = state?.product


  const [formData, setFormData] = useState({
    Name: product?.name || "", 
    Price: product?.price || "",
    Size: product?.size || "",
    Quantity: product?.quantity || "",
    Color: product?.color || "",
    Description: product?.description || "",
    ScheduleDate: product?.scheduleDate || "",
    Action: product?.isActive || "",
    CategoryId: product?.categoryId || 0, 
    IsActive: product?.isActive || "",
    ImageCover: product?.imageCover || "", 
    SubCategoryId:product?.SubCategoryId || "",
    TradeDiscount:product?.tradeDiscount || "",
    SaleDiscount:product?.saleDiscount || "",
  });

 const handelInput = (e)=>{
  const { id, value } = e.target;
  setFormData({
    ...formData,
    [id]: id === "IsActive" ? (value === "now" ? true : value === "later" ? false : "") : value,
  })
 }
 const handelSubmit = (e) => {
  e.preventDefault();


  const formDataToSend = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    formDataToSend.append(key, value);
  });

 
  instance
    .put(`/Product/${product.id}`, formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      toast.success("تم تحديث المنتج بنجاح:", response.data);
    })
    .catch((error) => {
      toast("خطأ في تحديث المنتج:", error.response?.data || error.message);
    });
};
  return (
    <div className={styles.editeProduct}>
      <h1 >تعديل المنتج</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handelSubmit}>
            <div className={styles.formInput}>
          <InputField
            label="اسم المنتج"
            id="Name"
            placeholder="الاسم"
            required
            onchange={handelInput}
            value={formData.Name}
          />
          <InputField
            label="السعر"
            id="Price"
            placeholder="0"
            required
            icon={<img src={priceIcon} alt="رمز السعر" />}
            value={formData.Price}
            onchange={handelInput}
          />
          <InputField
            label="الكمية"
            id="Quantity"
            type="text"
            required
            onchange={handelInput}
            value={formData.Quantity}
          />
          <InputField
            label="الوصف"
            id="Description"
            placeholder="الوصف"
            type="text"
            onchange={handelInput}
            value={formData.Description}
          />
       
            <InputField
              label="الحالة"
              id="IsActive"
              type="select"
              options={[
                { value: "", label: "اختر الحالة" },
                { value: "now", label: "الآن" },
                { value: "later", label: "لاحقًا" },
              ]}
              onchange={handelInput}
              value={formData.IsActive}
          />
           <InputField
            label="خصم التجارة"
            id="TradeDiscount"
            type="text"
            onchange={handelInput}
            value={formData.TradeDiscount}
          />
           <InputField
            label="خصم البيع"
            id="SaleDiscount"
            type="text"
            onchange={handelInput}
            value={formData.SaleDiscount}
          />
          </div>
          <div className="--btn-action">
           <MainButton value="إلغاء"/>
           <MainButton value="حفظ" type="submit" />
          </div>
        </form>
      </div>
    { /* <div>
        <h1>Add Sale</h1>
      <div className={styles.saleFormContainer}>
        <form>
        <div className={styles.saleFormInput}>
        <InputField
            label="Price"
            id="price"
            placeholder="0"
            required
            icon={<img src={priceIcon} alt="Price Icon" />}
          />
           <InputField
            label="Price After Sale"
            id="price"
            placeholder="0"
            required
            icon={<img src={priceIcon} alt="Price Icon" />}
          />
        </div>
        <div className="--btn-action">
           <MainButton value="Cancle"/>
           <MainButton value="Save"/>
          </div>
        </form>
      </div>
    </div>*/}
    </div>
  );
};

export default EditPublishedProduct;
