import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import First from './pages/First';
import Footer from './components/Footer';
import "./App.css";

const App = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path="/" element={<First />}/>
        </Routes>
        <Footer />
    </>
  )
}

export default App