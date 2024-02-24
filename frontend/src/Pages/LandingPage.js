import React from 'react';
import Navbar from '../Components/Navbar'
import Computer from './Computer';
import './App.css'

function App() {

  return (
    <div className="MyPortfolio bg-[#0c0c1d]">
        <Navbar />
        <section>
            About
            <Computer/>
        </section>
        <section>Projects</section>
        <section>Skills</section>
        <section>Experiences</section>
    </div>
  );
}

export default App;


