import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../store/authSlice";
import { getUserData } from "../../store/userSlice";

function Verify() {
  const [otp, setOtp] = useState("");
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = userData.email;

    try {
      // Verify the OTP
      const verifyStatus = await axios.post(
        "http://localhost:4000/api/v1/cgate/verify",
        { email, otp }
      );

      if (verifyStatus.data.success) {
        // If OTP is verified, complete the signup process
        const signupStatus = await axios.post(
          "http://localhost:4000/api/v1/cgate/send",
          userData
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
      } else {
        toast.error("OTP verification failed.");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="OTP"
        onChange={(e) => setOtp(e.target.value)}
        value={otp}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Verify;