import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa";
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <div className={styles.footerSectionOne}>
        <div className={styles.footerLogoContainer}>
          <img src={""} alt="" />
        </div>
        <div className={styles.footerIcons}>
          <BsTwitter />
          <SiLinkedin />
          <BsYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className={styles.footerSectionTwo}>
        <div className={styles.footerSectionColumns}>
          <span>Home</span>
          <span>Courses</span>
          <span>Gate Special</span>
        </div>
        <div className={styles.footerSectionColumns}>
          <span>+91-9835274521</span>
          <span>gate@app.com</span>
        </div>
        <div className={styles.footerSectionColumns}>
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;