import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={LandingPage}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;