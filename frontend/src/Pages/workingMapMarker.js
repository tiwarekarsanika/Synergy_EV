import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import Source from '../Images/Source.json'
import Destination from '../Images/Destination.json'
import chargingStationsData from './ev_charging.json'; // Adjust the path accordingly

const UserChoice = () => {
  const [chargingStations, setChargingStations] = useState([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [chargingStops, setChargingStops] = useState('');
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [lastWaypoint, setLastWaypoint] = useState(null); // State to store the last waypoint coordinates
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    setChargingStations(chargingStationsData);
  }, []);

  useEffect(() => {
    if (chargingStations.length > 0) {
      initMap();
    }
  }, [chargingStations]);

  useEffect(()=>{
    setChargingStops(3);
  })

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 23.5120, lng: 80.3290 },
      zoom: 8
    });
    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map: mapInstance }));

    // chargingStations.forEach(station => {
    //   const marker = new window.google.maps.Marker({
    //     position: { lat: parseFloat(station.latitude), lng: parseFloat(station.longitude) },
    //     map: mapInstance,
    //     title: station.name
    //   });

    //   // Add click event listener to each marker
    //   marker.addListener('click', () => {
    //     addWaypointAndRecalculateRoute(marker.getPosition());
    //   });
    // });
  };

  const addWaypointAndRecalculateRoute = (position) => {
    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: 'DRIVING',
      waypoints: [{ location: position, stopover: true }] // Add the clicked position as a waypoint
    };
  
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        // Extract total duration of the journey
        const totalDuration = response.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);
  
        // Convert duration from seconds to hours and minutes
        const hours = Math.floor(totalDuration / 3600);
        const minutes = Math.floor((totalDuration % 3600) / 60);
  
        // Display total duration of the journey
        setTotalTime(`${hours} hours ${minutes} minutes`);
  
        // Update the route with the new waypoints
        directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  const planTrip = () => {
    // Validate input
    if (startLocation === '' || endLocation === '' || chargingStops === '' || isNaN(chargingStops) || chargingStops < 0) {
      alert('Please enter valid information.');
      return;
    }
  
    // Create a request object for the Directions API
    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: 'DRIVING'
    };
  
    // Request directions from the Directions API
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        // Extract total duration of the journey
        const totalDuration = response.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);
        
        // Convert duration from seconds to hours and minutes
        const hours = Math.floor(totalDuration / 3600);
        const minutes = Math.floor((totalDuration % 3600) / 60);
  
        // Display total duration of the journey
        setTotalTime(`${hours} hours ${minutes} minutes`);
  
        // Generate waypoints for charging stops
        const waypoints = generateChargingStations(response.routes[0].overview_path, parseInt(chargingStops));
        
        // Update the route with waypoints (charging stops)
        updateRouteWithWaypoints(request, waypoints);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };
  

  const generateChargingStations = (path, numStations) => {
    const stations = [];
    const increment = Math.floor(path.length / (numStations + 1));

    for (let i = 1; i <= numStations; i++) {
      stations.push({
        location: path[i * increment],
        stopover: true
      });
    }

    return stations;
  };

  const updateRouteWithWaypoints = (request, waypoints) => {
    request.waypoints = waypoints;
  
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
        const lastLeg = response.routes[0].legs[response.routes[0].legs.length - 2];
        const lastWaypointCoords = {
          lat: lastLeg.end_location.lat(),
          lng: lastLeg.end_location.lng()
        };
        setLastWaypoint(lastWaypointCoords); // Update last waypoint coordinates
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };
  
  useEffect(() => {
    if (lastWaypoint) {
      fetchNearbyRestaurants(lastWaypoint.lat, lastWaypoint.lng);
    }
  }, [lastWaypoint]);

  const fetchNearbyRestaurants = (lat, lng) => {
    const request = {
      location: { lat, lng },
      radius: 100000, // 5km radius
      name: 'ev charging stations' // Search for charging stations
    };
  
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        // Add markers for each charging station
        results.forEach(place => {
          const marker = new window.google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name
          });
  
          // Add click event listener to each marker
          marker.addListener('click', () => {
            addWaypointAndRecalculateRoute(marker.getPosition());
          });
        });
      }
    });
  };



  const startDirections = () => {
    directionsService.route({
      origin: startLocation,
      destination: endLocation,
      waypoints: [],
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  useEffect(() => {
    if (lastWaypoint) {
      console.log('Last Waypoint Coordinates:', lastWaypoint);
    }
  }, [lastWaypoint]);

  return (
    <div className="App mt-28">
      <Navbar />
      <div className="flex mx-5 justify-center items-center">
        <div className='m-5 p-5 h-fit shadow-md shadow-slate-500 w-1/3 text-black border rounded-sm grid place-items-center'> 
            <motion.div className='flex w-full bg-[#1e1e44] shadow-md border shadow-gray-800 rounded-lg m-4'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Lottie
                    options={{
                    loop: true,
                    autoplay: true,
                    animationData: Source,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                    },
                    }}
                    height={50}
                    width={50}
                />
                <motion.input
                    className="w-4/5 text-lg font-semibold pl-5 outline-none"
                    type="text"
                    placeholder="Source"
                    id="startLocation"
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                />
            </motion.div>
            <motion.div className='flex w-full bg-[#1e1e44] shadow-md border shadow-gray-800 rounded-lg m-4'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <div style={{ padding: '10px', paddingLeft: '22px', paddingRight: '22px'}}>
                <Lottie
                    options={{
                    loop: true,
                    autoplay: true,
                    animationData: Destination,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice',
                    },
                    }}
                    height={30}
                    width={30}
                />
                </div>
                <motion.input
                    className="w-full text-lg font-semibold pl-5 outline-none"
                    type="text"
                    placeholder="Destination"
                    id="endLocation"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                />
            </motion.div>

      {/* <div>
        <label htmlFor="chargingStops">Number of Charging Stops:</label>
        <input type="number" id="chargingStops" value={chargingStops} onChange={(e) => setChargingStops(e.target.value)} min="0" placeholder="Enter number of charging stops" />
      </div> */}

        <motion.button className='flex bg-[#1e1e44] shadow-md border text-white shadow-gray-800 rounded-full m-4 p-3 px-5'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={planTrip}>
                    Plan Trip
            </motion.button>
            {totalTime && <p className='border-2 p-2 m-2 rounded-sm font-semibold'>Total Time: {totalTime}</p>}
      
    </div>
    <div className="flex-grow mx-5 h-fit shadow-md shadow-slate-500 w-1/3 text-white border rounded-sm">
          <div id="map" style={{ height: '400px', marginTop: '10px' }}></div>
      </div>
  </div>
  </div>
  );
};

export default UserChoice;
