import { useEffect, useState } from "react";
import styles from "./add-products.module.scss";
import { GoUpload } from "react-icons/go";
import InputField from "../../../inputGroup/InputField";
import MainButton from "../../../mainButton/MainButton";
import instance from "../../../../axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  const [schedule, setSchedule] = useState("now");

  const navigate = useNavigate();
  const [image, setImage] = useState({
    coverImg: null,
    measurementImage: null,
    explainChart: null,
  });

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    subCategory: "",
    description: "",
    color: "",
    size: "",
    price: "",
    quantity: "",
    ScheduleDate: "",
    CategoryId: null,
    SubCategoryId: null,
    category: "",
    isPriceSame: null,
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await instance.get("/Category");
        setCategories(categoryResponse.data);
      } catch (error) {
        toast.error("خطأ في جلب الفئات:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e, key) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage((prevState) => ({
        ...prevState,
        [key]: file,
        [`${key}Preview`]: imageURL,
      }));
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const imageObjects = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(imageObjects);
  };

  const fetchSubCategory = async (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    try {
      const response = await instance.get(`/SubCategory?categoryId=${value}`);
      setSubCategories(response.data);
      setFormData((prevState) => ({
        ...prevState,
        subCategory: "",
      }));
    } catch (error) {
      toast.error("خطأ في جلب الفئات الفرعية:", error.message);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: id === "isPriceSame" ? (value === "on" ? true : value === "off" ? false : "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendAttachment = async (id) => {
      const attachment = new FormData();
      images.forEach((image) => {
        attachment.append("Images", image.file);
      });
      attachment.append("ProductId", id);
      attachment.append("MeasurmentCahart", image.measurementImage);
      attachment.append("ExplainChart", image.explainChart);

      try {
        const response = await instance.post(
          "/Product/Attachment",
          attachment,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("تم إضافة المرفقات بنجاح", response.data);
      } catch (error) {
        toast.error("خطأ في إضافة المرفقات:", error);
      }
    };

    const formDatas = new FormData();
    formDatas.append("Name", formData.name);
    formDatas.append("Color", formData.color);
    formDatas.append("Description", formData.description);
    formDatas.append("Price", formData.price);
    formDatas.append("Quantity", formData.quantity);

    if (schedule === "later") {
      formDatas.append("ScheduleDate", formData.ScheduleDate);
    }

    formDatas.append("ImageCover", image.coverImg);
    formDatas.append("SubCategoryId", formData.SubCategoryId);
    formDatas.append("CategoryId", formData.CategoryId);
    formDatas.append("IsActive", schedule === "now");
    formDatas.append("IsPriceSame", formData.isPriceSame);

    try {
      const response = await instance.post("/Product", formDatas, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const productId = response.data.data.id;
      await sendAttachment(productId);
      toast.success("تم إضافة المنتج بنجاح", response.data);
    } catch (error) {
      toast.error("خطأ في إضافة المنتج:", error);
    }
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  return (
    <div className={styles["add-productPage"]}>
      <div className="main-header">
        <h1>إضافة منتجات</h1>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles["product-info"]}>
            <div className={styles["basic-info"]}>
              <InputField
                label="الاسم"
                id="name"
                placeholder="أضف اسمًا"
                value={formData.name}
                onchange={handleInputChange}
                required
              />
              <InputField
                label="الفئة"
                id="CategoryId"
                type="select"
                options={[
                  { value: "", label: "اختر فئة" },
                  ...categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  })),
                ]}
                value={formData.category}
                onchange={fetchSubCategory}
              />
              <InputField
                label="الفئة الفرعية"
                id="SubCategoryId"
                type="select"
                options={[
                  { value: "", label: "اختر فئة فرعية" },
                  ...subCategories.map((subCategory) => ({
                    value: subCategory.id,
                    label: subCategory.name,
                  })),
                ]}
                value={formData.subCategory}
                onchange={handleInputChange}
              />
            </div>

            {/* الوصف */}
            <div className={styles["description-section"]}>
              <InputField
                label="أضف وصفًا"
                id="description"
                type="textarea"
                value={formData.description}
                onchange={handleInputChange}
                placeholder="أضف وصفًا"
              />
            </div>
          </div>
          <div className={styles.price}>
            <InputField
              label="السعر"
              id="price"
              placeholder="أضف سعرًا"
              value={formData.price}
              onchange={handleInputChange}
              required
            />
            <InputField
              label="هل السعر ثابت"
              id="isPriceSame"
              type="select"
              options={[
                { value: "", label: "اختر" },
                { value: "on", label: "نعم" },
                { value: "off", label: "لا" },
              ]}
              onchange={handleInputChange}
              value={formData.isPriceSame}
            />
            <InputField
              label="الكمية"
              id="quantity"
              placeholder="أضف كمية"
              value={formData.quantity}
              onchange={handleInputChange}
              required
            />
          </div>
          {/* قسم تحميل الصور */}
          <div className={styles["image-upload-section"]}>
            <div
              className={`${styles["image-upload"]} ${styles.cover}`}
              style={{ border: image.coverImg && "none" }}
            >
              <label htmlFor="coverImg">
                <input
                  type="file"
                  id="coverImg"
                  onChange={(e) => handleImageChange(e, "coverImg")}
                  accept=".png, .jpg, .jpeg"
                  hidden
                />
                <div
                  className={styles.productPicture}
                  style={{
                    backgroundImage: image.coverImg
                      ? `url(${URL.createObjectURL(image.coverImg)})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!image.coverImg && (
                    <div>
                      <GoUpload />
                      <h4>
                        اسحب وأفلت أو <span>اختر ملفًا</span> لتحميل صورة الغلاف
                      </h4>
                    </div>
                  )}
                </div>
              </label>
            </div>

            <div
              className={`${styles["image-upload"]} ${styles.image}`}
              style={{ border: images.length > 0 && "none" }}
            >
              <label htmlFor="img">
                <input
                  type="file"
                  id="img"
                  multiple
                  onChange={handleImagesChange}
                  accept=".png, .jpg, .jpeg"
                  hidden
                />
                <div
                  className={styles.productPicture}
                  style={{
                    backgroundImage: images.length
                      ? `url(${URL.createObjectURL(images[0].file)})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: images ? "none" : "2px dashed var(--main-color)",
                  }}
                >
                  {!images.length && (
                    <div>
                      <GoUpload />
                      <h4>
                        اسحب وأفلت أو <span>اختر ملفًا</span> لتحميل الصور
                        <p>PNG أو JPEG</p>
                      </h4>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          قسم القياسات
          <div className={styles["measurements-container"]}>
            <h4> أضف القياسات</h4>
            <div className={styles["image-upload-section"]}>
              <div
                className={`${styles["image-upload"]} ${styles.cover}`}
                style={{ border: image.measurementImage && "none" }}
              >
                <label htmlFor="measurementImage">
                  <input
                    type="file"
                    id="measurementImage"
                    onChange={(e) => handleImageChange(e, "measurementImage")}
                    accept=".png, .jpg, .jpeg"
                    hidden
                  />
                  <div
                    className={styles.productPicture}
                    style={{
                      backgroundImage: image.measurementImage
                        ? `url(${URL.createObjectURL(image.measurementImage)})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!image.measurementImage && (
                      <div>
                        <GoUpload />
                        <h4>
                          اسحب وأفلت أو <span>اختر ملفًا</span> لتحميل صورة الغلاف
                        </h4>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              <div className={styles.measurments}></div>
              <div
                className={`${styles["image-upload"]} ${styles.image}`}
                style={{ border: image.explainChart && "none" }}
              >
                <label htmlFor="explainChart">
                  <input
                    type="file"
                    id="explainChart"
                    onChange={(e) => handleImageChange(e, "explainChart")}
                    accept=".png, .jpg, .jpeg"
                    hidden
                  />
                  <div
                    className={styles.productPicture}
                    style={{
                      backgroundImage: image.explainChart
                        ? `url(${URL.createObjectURL(image.explainChart)})`
                        : "none",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {!image.explainChart && (
                      <div>
                        <GoUpload />
                        <h4>
                          اسحب وأفلت أو <span>اختر ملفًا</span> لتحميل صورة الغلاف
                        </h4>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.measurments}></div>
          </div>

          {/* قسم الجدولة */}
          <div className={styles["schedule-section"]}>
            <div className={styles["schedule-options"]}>
              <label htmlFor="now">
                <input
                  id="now"
                  type="radio"
                  name="schedule"
                  value="now"
                  checked={schedule === "now"}
                  onChange={handleScheduleChange}
                />
                الآن
              </label>
              <label htmlFor="later">
                <input
                  id="later"
                  type="radio"
                  name="schedule"
                  value="later"
                  checked={schedule === "later"}
                  onChange={handleScheduleChange}
                />
                لاحقًا
              </label>
            </div>

            {schedule === "later" && (
              <div className={styles["schedule-time"]}>
                <InputField
                  label="تاريخ الجدولة"
                  id="ScheduleDate"
                  type="date"
                  placeholder="اختر تاريخًا"
                  required
                  onchange={handleInputChange}
                />
                <InputField
                  label="وقت الجدولة"
                  type="time"
                  placeholder="اختر وقتًا"
                  required
                  onchange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* أزرار الإجراءات */}
          <div className="--btn-action">
            <MainButton
              value="إلغاء"
              onClick={() => {
                navigate("/admin/products");
              }}
            />
            <MainButton value="حفظ" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;