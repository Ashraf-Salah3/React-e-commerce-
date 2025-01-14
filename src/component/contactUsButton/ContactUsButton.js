import React from "react";
import styles from "./contactusButton.module.scss";
import { FaPhoneAlt } from "react-icons/fa";
const ContactUsButton = () => {
  return (
    <div className={styles.contactbutton}>
      <a
        href="https://wa.me/message/BIWJZGQJHQVOJ1"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaPhoneAlt/>
        <p>إتصل بنا</p>
      </a>
    </div>
  );
};

export default ContactUsButton;
