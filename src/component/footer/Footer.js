import { logo } from "../../assets";
import styles from "./footer.module.scss";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
export const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className={styles.footerDetails}>
          <div className={styles.logo}>
            <img src={logo} alt="" />
          </div>

          <div className={styles.contactus}>
            <h2>تواصلوا معنا عبر </h2>
            <div className={styles.icons}>
              <a href="##" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </a>
              <a href="##" target="_blank" rel="noopener noreferrer">
                <FaTiktok />
              </a>
              <a href="##" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href="##" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="##" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="##" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp />
              </a>
            </div>
          </div>
          <div className={styles.ourLocation}>
            <h2>موقعنا:</h2>
            <p>
              الغربيه -طنطا
            </p>
          </div>
        </div>
        <hr></hr>
        <div>
          <p> ©جميع الحقوق محفوظة 2024 </p>
          <p className={styles.copyRight}> Designed by Ashraf Salah </p>
        </div>
      </div>
    </div>
  );
};
