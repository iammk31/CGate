import React, { useState } from "react";
import styles from './Contact.module.css';
import { backendUrl } from "../utils/config.js";
import { useSelector } from "react-redux";

const Contact = () => {
  const [message, setMessage] = useState("");
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  let userEmail = "";

  if (token !== null && user) {
    userEmail = user.email;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userEmail)
      const response = await fetch(`${backendUrl}api/v1/cgate/send-query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, message }),
      });

      if (response.ok) {
        alert('Query sent successfully!');
        setMessage('');
      } else {
        alert('Error sending query');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error sending query');
    }
  };

  const handleButtonClick = (e) => {
    if (!token) {
      alert("You must be logged in to submit a query.");
    } else {
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.contactPageWrapper}>
      <h1 className={styles.primaryHeading}>Any Query?</h1>
      <h1 className={styles.primaryHeading}>Let Us Help You</h1>
      <div className={styles.contactFormContainer}>
        {/* <input
          type="text"
          value={userEmail}
          readOnly
        /> */}
        <input
          placeholder="Your query here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className={styles.secondaryButton} onClick={handleButtonClick}>
          Submit
        </button>

      </div>
    </div>
  );
};

export default Contact;
