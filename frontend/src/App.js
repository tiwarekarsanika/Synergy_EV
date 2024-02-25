import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from "./Pages/HomePage"
import MapRoutes from './Pages/MapRoutes'
import ChargingStations from './Pages/ChargingStations';
import Landing from './Pages/Landing';
import SelectCar from './Components/SelectCar'
import LoginSignup from './Pages/LoginSignup (1)'
import MapContainer from './Pages/mapContainer';
import UserChoice from './Pages/workingMapMarker'
// import SOS from "./Pages/SOS";
import CabService from "./Pages/CabServices";
import TowService from "./Pages/TowService";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/selectcar' Component={SelectCar}/>
          <Route path='/' Component={Landing}/>
          <Route path='/home' Component={HomePage}/>
          <Route path='/maproutes' Component={MapRoutes}/>
          <Route path='/chargingStations' Component={ChargingStations}/>
          <Route path='/login' Component={LoginSignup}/>
          <Route path='/mapcontainer' Component={MapContainer}/>
          <Route path='/userchoice' Component={UserChoice}/>
          {/* <Route path="/sos" Component={SOS} /> */}
          <Route path="/cabService" Component={CabService} />
          <Route path="/towService" Component={TowService} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
