import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import HomePage from "./Pages/HomePage"
import MapRoutes from './Pages/MapRoutes'
import ChargingStations from './Pages/ChargingStations';
import Landing from './Pages/Landing';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={LandingPage}/>
          <Route path='/landing' Component={Landing}/>
          <Route path='/home' Component={HomePage}/>
          <Route path='/maproutes' Component={MapRoutes}/>
          <Route path='/chargingStations' Component={ChargingStations}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;