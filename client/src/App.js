import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import PreviousYear from "./Components/Gate2025/PreviousYear";
import PrepVideos from "./Components/Gate2025/PrepVideos";
import Admin from "./Components/Admin/Admin";
import { useSelector } from "react-redux";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    if (token && user.uType==="admin") {
      setLoggedIn(true);
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/PreviousYear" element={<PreviousYear />} />
        <Route path="/PrepVideos" element={<PrepVideos />} />
        {loggedIn && <Route path="/admin" element={<Admin />} />}
      </Routes>
    </Router>
  );
}

export default App;
