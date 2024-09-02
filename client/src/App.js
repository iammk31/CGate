import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import PreviousYear from "./Components/Gate2025/PreviousYear";
import PrepVideos from "./Components/Gate2025/PrepVideos";
import Admin from "./Components/Admin/Admin";
import UserOSQuiz from "./Components/Gate2025/UserOSQuiz";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setLoggedIn(true);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
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
        <Route
          path="/admin"
          element={
            
              <Admin />
            
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
