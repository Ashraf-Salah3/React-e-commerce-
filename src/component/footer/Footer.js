

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
            <a
              href="https://www.linkedin.com/in/rabbit-clothes-4b2289291?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn/>
            </a>
            <a
              href="https://www.tiktok.com/@rabbit.clothes1?_t=8sg5jrFAz5d&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok/>
            </a>
            <a
              href="https://www.facebook.com/rabbitclothes1?mibextid=ZbWKwL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://x.com/RabbitClothes?t=pitqpZQuq8c6Vl8xdwSS2w&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/rabbit.clothes1/profilecard/?igsh=NjRjdmdhM3kzcGpz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href="https://wa.me/message/BIWJZGQJHQVOJ1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp/>
            </a>
          </div>
        </div>
        <div className={styles.ourLocation}>
          <h2>موقعنا:</h2>
          <p>
            جنين _ شارع الحسبة _ مركز النفاع التجاري الجديد _ أسم المحل أبو غالي
            سنتر
          </p>
        </div>
      </div>
      <hr></hr>
      <div >
        <p> ©جميع الحقوق محفوظة 2024 </p>
        <p className={styles.copyRight}> Designed by Ashraf Salah </p>
      </div>
      </div>
    </div>
  );
};
