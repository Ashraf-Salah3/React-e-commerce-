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
    explainChart:null,
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
    isPriceSame:null
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await instance.get("/Category");
        setCategories(categoryResponse.data);
      } catch (error) {
        toast.error("Error fetching categories:", error);
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
      toast.error("Error fetching subcategories:", error.message);
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
        toast.success("Attachments added successfully", response.data);
      } catch (error) {
        toast.error("Error adding attachments:", error);
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
    formDatas.append("IsPriceSame" , formData.isPriceSame)

    try {
      const response = await instance.post("/Product", formDatas, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const productId = response.data.data.id;
      await sendAttachment(productId);
      toast.success("Product added successfully", response.data);
    } catch (error) {
      toast.error("Error adding product:", error);
    }
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };

  return (
    <div className={styles["add-productPage"]}>
      <div className="main-header">
        <h1>Add Products</h1>
      </div>
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
          <div className={styles["product-info"]}>
            <div className={styles["basic-info"]}>
              <InputField
                label="Name"
                id="name"
                placeholder="Add a Name"
                value={formData.name}
                onchange={handleInputChange}
                required
              />
              <InputField
                label="Category"
                id="CategoryId"
                type="select"
                options={[
                  { value: "", label: "Choose a category" },
                  ...categories.map((category) => ({
                    value: category.id,
                    label: category.name,
                  })),
                ]}
                value={formData.category}
                onchange={fetchSubCategory}
              />
              <InputField
                label="Sub-category"
                id="SubCategoryId"
                type="select"
                options={[
                  { value: "", label: "Choose a sub-category" },
                  ...subCategories.map((subCategory) => ({
                    value: subCategory.id,
                    label: subCategory.name,
                  })),
                ]}
                value={formData.subCategory}
                onchange={handleInputChange}
              />
            </div>

            {/* Description */}
            <div className={styles["description-section"]}>
              <InputField
                label="Add a Description"
                id="description"
                type="textarea"
                value={formData.description}
                onchange={handleInputChange}
                placeholder="Add a Description"
              />
            </div>
          </div>
          <div className={styles.price}>
            <InputField
              label="Price"
              id="price"
              placeholder="Add a Price"
              value={formData.price}
              onchange={handleInputChange}
              required
            />
                 <InputField
              label="Is Price Same"
              id="isPriceSame"
              type="select"
              options={[
                { value: "", label: "Select"  },
                { value: "on", label: "on" },
                { value: "off", label: "off" },
              ]}
              onchange={handleInputChange}
              value={formData.isPriceSame}
          />
            <InputField
              label="Quantity"
              id="quantity"
              placeholder="Add a quantity"
              value={formData.quantity}
              onchange={handleInputChange}
              required
            />
          </div>
          {/* Image Upload Section */}
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
                        Drag & Drop or <span>Choose file</span> to upload Image
                        Cover
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
                        Drag & Drop or <span>Choose file</span> to upload Images
                        <p>PNG or JPEG</p>
                      </h4>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Measurements Section */}
          <div className={styles["measurements-container"]}>
            <h4> Add Measurements</h4>
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
                          Drag & Drop or <span>Choose file</span> to upload
                          Image Cover
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
                          Drag & Drop or <span>Choose file</span> to upload
                          Image Cover
                        </h4>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className={styles.measurments}></div>
          </div>

          {/* Scheduling Section */}
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
                Now
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
                Later
              </label>
            </div>

            {schedule === "later" && (
              <div className={styles["schedule-time"]}>
                <InputField
                  label="Schedule Upload Date"
                  id="ScheduleDate"
                  type="date"
                  placeholder="Select date"
                  required
                  onchange={handleInputChange}
                />
                <InputField
                  label="Schedule Upload Time"
                  type="time"
                  placeholder="Select Time"
                  required
                  onchange={handleInputChange}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="--btn-action">
            <MainButton
              value="Cancle"
              onClick={() => {
                navigate("/admin/products");
              }}
            />
            <MainButton value="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProducts;
