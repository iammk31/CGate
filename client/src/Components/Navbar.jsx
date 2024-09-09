import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

const Navbar = () => {
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token !== null) {
      setLoggedIn(true);
    }
  }, [loggedIn]);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }
    setLastScrollY(window.scrollY);
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={
        "flex w-full  justify-between items-center px-2 py-1 md:px-4 md:py-2 bg-[#2c1f31]"
      }
      style={{
        top: navbarVisible ? "0" : "-100px", // Adjust the negative value according to your navbar's height
      }}
    >
      <div className="flex items-center justify-start w-1/6">
        <Link to={"/"}>
          <img
            src={"../../images/logo.gif"}
            alt=""
            style={{ width: "68px", height: "53px" }}
          />
        </Link>
      </div>
      <ul className="flex gap-4 items-center justify-end w-5/6 py-2">
        <div className="flex gap-2  items-center">
          <li className="relative group">
            <Link
              to={""}
              className="block px-3 py-1 sm:px-4 sm:py-2 hover:bg-[#2c1f31] text-white rounded-lg no-underline text-sm sm:text-base"
            >
              Gate2025
            </Link>
            <ul className="absolute hidden group-hover:block bg-[#2c1f31] shadow-lg rounded-lg w-40 py-2  text-white">
              <li>
                <Link
                  to="/PreviousYear"
                  className="block py-2 px-3  text-white no-underline text-sm"
                >
                  Previous Year
                </Link>
              </li>
              <li>
                <Link
                  to="/PrepVideos"
                  className="block py-2 px-3  text-white no-underline text-sm"
                >
                  Prep Videos
                </Link>
              </li>
              <li>
                <Link
                  to="/UserOSQuiz"
                  className="block py-2 px-3  text-white no-underline text-sm"
                >
                  Quiz
                </Link>
              </li>
            </ul>
          </li>
        </div>
        {loggedIn ? (
          <button
            onClick={handleLogout}
            className="text-gray-900 bg-white border border-gray-300 font-medium rounded-full text-xs sm:text-sm px-4 py-2"
          >
            Logout
          </button>
        ) : (
          <div className="flex  gap-2 md:gap-4  items-center">
            <button className="text-gray-900 bg-white border border-gray-300 font-medium rounded-2xl text-lg px-2 py-1 md:px-4 md:py-2 ">
              <Link to={"/Login"} className="no-underline text-gray-900">
                Login
              </Link>
            </button>
            <button className="text-white bg-transparent border border-gray-300 font-medium rounded-2xl text-lg px-2 py-1 md:px-4 md:py-2 ">
              <Link to={"/Signup"} className="no-underline text-white">
                Signup
              </Link>
            </button>
          </div>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
