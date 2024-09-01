import React from "react";
import styles from "./Home.module.css";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Footer from "./Footer";

const Home = () => {
  const cardData = [
    {
      imgSrc: "../../images/exam.png",
      imgAlt: "Exam Image",
      title: "Learn The Latest Skills",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    },
    {
      imgSrc: "../../images/certification.png",
      imgAlt: "Certification Image",
      title: "Earn Your Certification",
      description: "Get certified and stand out in your field.",
    },
    {
      imgSrc: "../../images/onlineTest.png",
      imgAlt: "Online Test Image",
      title: "Test Your Knowledge",
      description: "Assess your understanding with our online tests.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className={styles.Container}>
        <div className={styles.image}>
          <div className={styles.form}>
            <div className={styles.heading}>
              <h1 style={{ color: "#050C26" }}>The&nbsp;</h1>
              <h1 style={{ color: "#FF7426" }}>Smart&nbsp;</h1>
            </div>
            <div className={styles.heading1}>
              <h1 style={{ color: "#050C26" }}>Choice&nbsp;</h1>
              <h1 style={{ color: "#050C26" }}>For&nbsp;</h1>
              <h1 style={{ color: "#FF7426" }}>Future</h1>
            </div>

            <form className={styles.searchForm} role="search">
              <div className={styles.searchContainer}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                </svg>
                <input
                  className={styles.formControl}
                  type="search"
                  placeholder="Search for a location..."
                  aria-label="Search"
                />
                <button className={styles.searchButton} type="submit">
                  <button className={styles.continueButton} type="button">
                    Continue
                  </button>
                </button>
              </div>
            </form>
          </div>
          <img
            src="../../images/Objects.png"
            alt="Overlay"
            className={styles.bg}
          />
        </div>
        <div className={styles.card}>
          {cardData.map((item, index) => (
            <React.Fragment key={index}>
              <div className={styles.Transparent}>
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className={styles.cardImg}
                />
              </div>
              <div className={styles.textCard}>
                <h5 className={styles.text}>{item.title}</h5>
                <p className={styles.text}>{item.description}</p>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
