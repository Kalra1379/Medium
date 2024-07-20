import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Screens/Home';
import ContactForm from './components/ContactForm';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';
import Footer from './components/Footer';
import ServicesSection from './components/ServicesSection';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<ContactForm/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/services' element={<ServicesSection/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
