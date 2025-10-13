import React from 'react'
import Navbar from './components/Header/Navbar/Navbar'
import About from './components/About/About'
import Portfolio from './components/Portfolio/Portfolio'
import './App.css';
import Footer from './components/Footer/Footer'
import Services from './components/Services/Services';

function App() {
  return (
    <div >
     
      <Navbar/> 
      <About/>
      <Portfolio/>
      <Services/>
      <Footer/>     
    </div>
  )
}

export default App