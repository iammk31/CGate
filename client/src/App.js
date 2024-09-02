import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import PreviousYear from "./Components/Gate2025/PreviousYear";
import PrepVideos from "./Components/Gate2025/PrepVideos";
import Admin from "./Components/Admin/Admin";
<<<<<<< HEAD
import UserOSQuiz from "./Components/Gate2025/UserOSQuiz";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (token && user.uType === "admin") {
      setLoggedIn(true);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
<<<<<<< HEAD
        <Route
          path="/login"
          element={
              <Login />
          }
        />
        <Route
          path="/signup"
          element={
              <Signup />
          }
        />
        <Route
          path="/PreviousYear"
          element={
            
              <PreviousYear />

          }
        />
        <Route
          path="/PrepVideos"
          element={
            
              <PrepVideos />
            
          }
        />
        <Route
          path="/UserOSQuiz"
          element={
            
              <UserOSQuiz />
            
          }
        />
        {loggedIn && <Route
          path="/admin"
          element={
              <Admin />
          }
        />}
      </Routes>
    </Router>
  );
}

export default App;
