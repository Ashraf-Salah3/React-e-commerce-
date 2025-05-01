import React, { useState } from 'react'
import MainButton from '../../../mainButton/MainButton'
import { GoUpload } from 'react-icons/go'
import styles from "./add-story.module.scss"
import instance from '../../../../axios'
import { toast } from 'react-toastify'
const AddStory = () => {
  const [storyImg, setStoryImg] = useState(null);
const [loading, setLoading] = useState(false)

  const handelStoriesSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const formData = new FormData();
    formData.append("StoryImage" , storyImg)
    try {
      await instance.post("/Story", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setStoryImg(null)
      toast.success("تم إضافة القصة");
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  };

  return (
    <div className={styles["story-contanier"]}>
        <div className="main-header">
          <h4>إضافة قصص</h4>
        </div>
        <form onSubmit={handelStoriesSubmit}>
          <div
            className={`${styles["image-upload"]} ${styles.image}`}
            style={{ border: storyImg && "none" }}
          >
            <label htmlFor="storyImg">
              <input
                type="file"
                id="storyImg"
                onChange={(e) => setStoryImg(e.target.files[0])}
                accept=".png, .jpg, .jpeg"
                hidden
              />
              <div
                className={styles.productPicture}
                style={{
                  backgroundImage: storyImg
                    ? `url(${URL.createObjectURL(storyImg)})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!storyImg && (
                  <div>
                    <GoUpload />
                    <h4>
                    اسحب وأفلت أو <span>اختر ملف</span> لتحميل الصور
                      <p>PNG أو JPEG</p>
                    </h4>
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="--btn-action">
            <MainButton value="حفظ" type="submit" loading={loading}/>
          </div>
        </form>
      </div>
  )
}

export default AddStory