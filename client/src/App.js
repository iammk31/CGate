import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import PreviousYear from './Components/Gate2025/PreviousYear';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <Navbar />
          <Home />
          <Contact />
          <Footer />
          
        </>}
        />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
        <Route path="PreviousYear" element={<><Navbar /><PreviousYear /><Footer /></>} />
      </Routes>
    </Router>
  );
}

export default App;
