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
           
             
              <a href="https://www.facebook.com/share/18rU1gCXJx/" target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            
             
              <a href="https://wa.me/qr/J7NI3TZQU66BB1" target="_blank" rel="noopener noreferrer">
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
          {/* <p className={styles.copyRight}> Designed by Ashraf Salah </p> */}
        </div>
      </div>
    </div>
  );
};
