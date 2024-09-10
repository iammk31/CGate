import React from "react";
// import styles from "./Home.module.css";
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
      <div className={"flex flex-col justify-center items-center w-full"}>
        <div className={"flex justify-center items-center w-full py-16 "}>
          <div className=" flex flex-col justify-center items-center w-1/2 md:pl-16 z-1">
            <div className="flex justify-start items-center w-full">
              <h1 style={{ color: "#050C26" }}>The&nbsp;</h1>
              <h1 style={{ color: "#FF7426" }}>Smart&nbsp;</h1>
            </div>
            <div className="flex justify-start items-center w-full">
              <h1 style={{ color: "#050C26" }}>Choice&nbsp;</h1>
              <h1 style={{ color: "#050C26" }}>For&nbsp;</h1>
              <h1 style={{ color: "#FF7426" }}>Future</h1>
            </div>

            <form
              className="w-full flex flex-col md:flex-row justify-start items-center shadow-lg px-4 py-2 rounded-3xl shadow-violet-900 bg-white"
              role="search"
            >
              <div className="flex gap-4 items-center w-full md:w-3/4 mb-2 md:mb-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-search hidden md:block"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                </svg>
                <input
                  className="w-full rounded-3xl  border-gray-300 outline-none bg-white py-1 px-3"
                  type="search"
                  placeholder="Search for a location..."
                  aria-label="Search"
                />
              </div>
              <div className="flex w-full md:w-1/4 justify-end">
                <button
                  className="bg-[#6c3483] text-white px-4 py-2 rounded-3xl w-full md:w-auto"
                  type="button"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
          <div className="w-1/2 md:pr-16 z-0">
            <img
              src="../../images/Objects.png"
              alt="Overlay"
              className={"object-cover w-full h-full"}
            />
          </div>
        </div>
        <div className="bg-[#2c1f31] flex flex-col md:flex-row mx-auto p-4 justify-center items-center gap-6 rounded-lg max-w-6xl">
          {cardData.map((item, index) => (
            <React.Fragment key={index}>
              <div className="bg-white/40 flex items-center justify-center p-4 rounded-full">
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-start items-start w-full">
                <h5 className="font-semibold text-white text-lg md:text-xl">
                  {item.title}
                </h5>
                <p className="text-white text-sm md:text-base">
                  {item.description}
                </p>
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
