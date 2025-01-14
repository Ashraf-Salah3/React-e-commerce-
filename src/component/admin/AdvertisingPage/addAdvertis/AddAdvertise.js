import React, { useState } from 'react'
import MainButton from '../../../mainButton/MainButton'
import { GoUpload } from 'react-icons/go'
import instance from '../../../../axios';
import { toast } from 'react-toastify';
import styles from "./add-addvertis.module.scss"
const AddAdvertise = () => {
  const [image, setImage] = useState(null);

  const handelAdvertisSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.append("AdvertismentImage", image);
    try {
      await instance.post("/Advertisment", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      toast.success("Advertisment Is Added");
      setImage(null)
    } catch (error) {}
  };
  return (
    <div className={styles["advertis-contanier"]}>
    <div className="main-header">
      <h4>Add Advertis</h4>
    </div>
    <form onSubmit={handelAdvertisSubmit}>
      <div
        className={`${styles["image-upload"]} ${styles.image}`}
        style={{ border: image && "none" }}
      >
        <label htmlFor="image">
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            accept=".png, .jpg, .jpeg"
            hidden
          />
          <div
            className={styles.productPicture}
            style={{
              backgroundImage: image
                ? `url(${URL.createObjectURL(image)})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!image && (
              <div>
                <GoUpload/>
                <h4>
                  Drag & Drop or <span>Choose file</span> to upload Images
                  <p>PNG or JPEG</p>
                </h4>
              </div>
            )}
          </div>
        </label>
      </div>
      <div className="--btn-action">
        <MainButton value="Save" type="submit" />
      </div>
    </form>
  </div>
  )
}

export default AddAdvertise