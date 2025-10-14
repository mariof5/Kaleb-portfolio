import React from 'react'
import Navbar from './components/Header/Navbar/Navbar'
import About from './components/About/About'
import Portfolio from './components/Portfolio/Portfolio'
import './App.css';
import Footer from './components/Footer/Footer'
import Services from './components/Services/Services';
import Contact from './pages/Contact/Contact';

function App() {
  return (
    <div >
     
      <Navbar/> 
      <About/>
      <Portfolio/>
      <Services/>
      <Contact/>
      <Footer/>     
    </div>
  )
}

export default App