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
    toast.success("Form Submitted");
  };

  return (
    <div className={styles.profilePage}>
      <div className="main-header">
        <h1>Profile Page</h1>
        <div>
          <button className="--btn --btn-primary --btn-small">
            <MdOutlineEdit size={20} />
            Edit
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
                      <h4> Add a Picture</h4>
                      <p>PNG or JPG</p>
                    </div>
                  )}
                </div>
              </label>
              <div>
                <div>
                  <h3>Mohammad Arja</h3>
                  <p>Website Manager</p>
                </div>
              </div>
            </div>

            <div className={styles.profileDetailsSection}>
              <InputField
                label="First Name"
                id="firstName"
                placeholder="First Name"
                required
                type="text"
               
              />
              <InputField
                label="Last Name"
                id="lastName"
                placeholder="Last Name"
             
                type="text"
              />
              <InputField
                label="Email"
                id="email"
                placeholder="Email"
        
                type="email"
              />
              <InputField
                label="Mobile Number"
                id="mobileNumber"
                placeholder="Mobile Number"
         
                type="text"
              />
              <InputField
                label="Password"
                id="password"
                placeholder="Password"
             
                type="password"
              />
              <InputField
                label="Job Title"
                id="jobTitle"
                placeholder="Job Title"
             
                type="text"
              />
            </div>
          </div>
          <div className="--btn-action">
            <MainButton value="Cancle" />
            <MainButton value="Save" type="submit"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
