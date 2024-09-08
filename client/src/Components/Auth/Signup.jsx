import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { useDispatch } from "react-redux";
import { getUserData } from "../../store/userSlice"; // Assume you have an action to set user data
import { login } from "../../store/authSlice";
import { backendUrl } from "../../utils/config.js";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [uType, setUType] = useState("user");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVerifyClick = async () => {
    // Add your email verification logic here
    if (email !== "") {
      setShowOtpInput(true);
    }
    try {
      await axios.post(
        `${backendUrl}api/v1/cgate/sendOtp`,
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(
        "OTP sent to your email. Please verify to complete registration."
      );
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    
  };

  const handleSubmit = async () => {
    console.log("inside submit");
    try {
      // Verify the OTP

      const verifyStatus = await axios.post(
        `${backendUrl}api/v1/cgate/verify`,
        { email, otp }
      );

      if (verifyStatus.data.success) {
        return true;
      } else {
        toast.error("OTP verification failed.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("inside signup");
    
    const isVerified = await handleSubmit();
    if (isVerified) {
      console.log("inside if");
      try {
        const signupStatus = await axios.post(
          `${backendUrl}api/v1/cgate/send`,
          { firstName, lastName, email, password, uType }
        );
        const data = await signupStatus.data;
        const { token, user } = data;
        if (signupStatus.data.success) {
          toast.success("Signup successful!");
          dispatch(getUserData({}));
          if (data.token != null && data.user.uType === "admin") {
            dispatch(login({ token, user }));
            localStorage.setItem("admin", data.user.uType);
            navigate("/admin");
          } else {
            dispatch(login({ token, user }));
            navigate("/");
          }
        }
      } catch (error) {
          console.error(error.response.data.message);
          console.log("first verify email");
          
      }
      
    }
  };

  return (
    <>
      <Navbar />
      <MDBContainer className="register-container">
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <img
                src="../../images/LoginImage.png"
                alt="login form"
                style={{ width: "500px", height: "650px" }}
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <img
                    src={"../../images/logo2.gif"}
                    alt=""
                    style={{ width: "68px", height: "55px" }}
                  />
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  SignUp into your account
                </h5>

                <div>
                  <MDBInput
                    wrapperClass="mb-4"
                    // label="FirstName"
                    id="formControlLg1"
                    type="text"
                    size="lg"
                    placeholder="FirstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    // label="LastName"
                    id="formControlLg2"
                    type="text"
                    size="lg"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  <div className="d-flex flex-row align-items-start mb-4">
                    <MDBInput
                      wrapperClass="mb-4 flex-grow-1"
                      // label="Email address"
                      id="formControlLg3"
                      type="email"
                      size="lg"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="ms-2 verify-btn"
                      color="primary"
                      size="lg"
                      onClick={handleVerifyClick}
                    >
                      Verify
                    </button>
                  </div>

                  {showOtpInput && (
                    <div className="mt-4">
                      <MDBInput
                        wrapperClass="mb-4"
                        // label="Enter OTP"
                        id="otpInput"
                        type="text"
                        size="lg"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                      />
                      <button className="submit-btn" color="success" size="lg" onClick={handleSubmit}>
                        Submit OTP
                      </button>
                    </div>
                  )}

                  <MDBInput
                    wrapperClass="mb-4"
                    // label="Password"
                    id="formControlLg4"
                    type="password"
                    size="lg"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="button-Login"
                  type="submit"
                  onClick={handleSignup}
                >
                  SignUp
                </button>

                <div className="d-flex flex-row justify-content-start">
                  <Link to="/" className="small text-muted me-1">
                    Terms of use.
                  </Link>
                  <Link to="/" className="small text-muted">
                    Privacy policy
                  </Link>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Signup;