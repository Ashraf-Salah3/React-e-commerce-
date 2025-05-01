import React from "react";
import styles from "./contactusButton.module.scss";
import { FaPhoneAlt } from "react-icons/fa";
const ContactUsButton = () => {
  const phoneNumber = +201551407100;
  return (
    <div className={styles.contactbutton}>
      <a
        href={`tel:${phoneNumber}`}
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
