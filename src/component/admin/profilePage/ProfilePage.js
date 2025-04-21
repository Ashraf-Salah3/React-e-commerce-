import { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import { MdOutlineEdit } from "react-icons/md";
import InputField from "../../inputGroup/InputField";
import MainButton from "../../mainButton/MainButton";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    toast.success("تم إرسال النموذج بنجاح");
  };

  return (
    <div className={styles.profilePage}>
      <div className="main-header">
        <h1>صفحة الملف الشخصي</h1>
        <div>
          <button className="--btn --btn-primary --btn-small">
            <MdOutlineEdit size={20} />
            تعديل
          </button>
        </div>
      </div>
      <div className={styles.profileFormContainer}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formInput}>
            <div className={styles.profilePictureWrapper}>
              <label htmlFor="profileImg">
                <input
                  type="file"
                  id="profileImg"
                  onChange={(e) => setImage(e.target.files[0])}
                  accept=".png, .jpg, .jpeg"
                  hidden
                />
                <div
                  className={styles.profilePicture}
                  style={{
                    backgroundImage:
                      image && `url(${URL.createObjectURL(image)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    border: image && "",
                  }}
                >
                  {!image && (
                    <div>
                      <span>+</span>
                      <h4> إضافة صورة</h4>
                      <p>PNG أو JPG</p>
                    </div>
                  )}
                </div>
              </label>
              <div>
                <div>
                  <h3></h3>
                  <p>مدير الموقع</p>
                </div>
              </div>
            </div>

            <div className={styles.profileDetailsSection}>
              <InputField
                label="الاسم الأول"
                id="firstName"
                placeholder="الاسم الأول"
                required
                type="text"
               
              />
              <InputField
                label="الاسم الأخير"
                id="lastName"
                placeholder="الاسم الأخير"
             
                type="text"
              />
              <InputField
                label="البريد الإلكتروني"
                id="email"
                placeholder="البريد الإلكتروني"
        
                type="email"
              />
              <InputField
                label="رقم الجوال"
                id="mobileNumber"
                placeholder="رقم الجوال"
         
                type="text"
              />
              <InputField
                label="كلمة المرور"
                id="password"
                placeholder="كلمة المرور"
             
                type="password"
              />
              <InputField
                label="المسمى الوظيفي"
                id="jobTitle"
                placeholder="المسمى الوظيفي"
             
                type="text"
              />
            </div>
          </div>
          <div className="--btn-action">
            <MainButton value="إلغاء" />
            <MainButton value="حفظ" type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;