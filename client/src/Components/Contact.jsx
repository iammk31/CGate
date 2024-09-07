import React from "react";
import styles from './Contact.module.css'

const Contact = () => {
  return (
    <div className={styles.contactPageWrapper}>
      <h1 className={styles.primaryHeading}>Any Query?</h1>
      <h1 className={styles.primaryHeading}>Let Us Help You</h1>
      <div className={styles.contactFormContainer}>
        <input type="text" placeholder="abc@gmail.com" />
        <button className={styles.secondaryButton}>Submit</button>
      </div>
    </div>
  );
};
// sbb badhiya
export default Contact;