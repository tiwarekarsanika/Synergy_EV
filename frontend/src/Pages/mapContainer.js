import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import Source from '../Images/Source.json'
import Destination from '../Images/Destination.json'
import Battery from '../Images/Battery.json'
import chargingStationsData from './ev_charging.json'; // Adjust the path accordingly
import { FaTaxi } from "react-icons/fa";
import { TbCarCrane } from "react-icons/tb";
import { IoMdBatteryCharging } from "react-icons/io";
import { GiPathDistance } from "react-icons/gi";
import { BsFillFuelPumpFill } from "react-icons/bs";
import SOS from './SOS'
import {useNavigate} from 'react-router-dom';

const MapContainer = () => {
  const [chargingStations, setChargingStations] = useState([]);
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [remainingBattery, setRemainingBattery] = useState('');
  const [energyConsmp, setEnergyConsmp] = useState('');
  const [totalRange, setTotalRange] = useState('');
  const [map, setMap] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [lastWaypoint, setLastWaypoint] = useState(null); // State to store the last waypoint coordinates
  const [totalTime, setTotalTime] = useState(null);
  const [chosenCoordinates, setChosenCoordinates] = useState(null);
  const [remainingDistance, setRemainingDistance] = useState(null);
  const [remainingPointCoordinates, setRemainingPointCoordinates] = useState(null);
  const [showMarker, setShowMarker] = useState(false);
  const [midpointNum, setMidpointNum] = useState('');
  const [hasRouteBeenFound, setHasRouteBeenFound] = useState(false);
  const [newRouteCoordinates, setNewRouteCoordinates] = useState(null);

  useEffect(() => {
    setChargingStations(chargingStationsData);
  }, []);

  useEffect(() => {
    if (chargingStations.length > 0) {
      initMap();
    }
  }, [chargingStations]);

  const initMap = () => {
    const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 23.5120, lng: 80.3290 },
      zoom: 5
    });
    setMap(mapInstance);
    setDirectionsService(new window.google.maps.DirectionsService());
    setDirectionsRenderer(new window.google.maps.DirectionsRenderer({ map: mapInstance }));
  };

  const addWaypointAndRecalculateRoute = (position) => {
    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: 'DRIVING',
      waypoints: [{ location: position, stopover: true }] // Add the chosen position as a waypoint
    };
  
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        const totalDuration = response.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);
        const hours = Math.floor(totalDuration / 3600);
        const minutes = Math.floor((totalDuration % 3600) / 60);
        setTotalTime(`${hours} hours ${minutes} minutes`);
        directionsRenderer.setDirections(response);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  const calculateRemainingDistance = () => {
    var remainingBatteryValue = parseFloat(remainingBattery);
    var totalRangeValue = parseFloat(totalRange);
    var energyConsumptionValue = parseFloat(energyConsmp);
  
    if (isNaN(remainingBatteryValue) || isNaN(totalRangeValue) || isNaN(energyConsumptionValue) || 
        remainingBatteryValue < 0 || remainingBatteryValue > 100 || energyConsumptionValue <= 0) {
      alert('Please enter valid information.');
      return;
    }
  
    const battCap = totalRangeValue * energyConsumptionValue;
    const battRem = (remainingBatteryValue / 100) * battCap;
    const calculatedRemainingDistance =  battRem / energyConsumptionValue;

    
  
    setRemainingDistance(calculatedRemainingDistance.toFixed(2)-10);
    calculateRemainingPointCoordinates(window.google);
    setShowMarker(true); // Show marker after calculating remaining distance
  };
  
  const planTrip = () => {
    if (startLocation === '' || endLocation === '') {
      alert('Please enter valid information.');
      return;
    }
  
    const request = {
      origin: startLocation,
      destination: endLocation,
      travelMode: 'DRIVING'
    };
  
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        const totalDuration = response.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);
        const hours = Math.floor(totalDuration / 3600);
        const minutes = Math.floor((totalDuration % 3600) / 60);
        setTotalTime(`${hours} hours ${minutes} minutes`);
        const waypoints = [{ location: response.routes[0].legs[0].end_location, stopover: true }];
        updateRouteWithWaypoints(request, waypoints);
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  const updateRouteWithWaypoints = (request, waypoints) => {
    request.waypoints = waypoints;
  
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
        const lastLeg = response.routes[0].legs[response.routes[0].legs.length - 1];
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
    if (remainingPointCoordinates && showMarker) {
      fetchNearbyRestaurants(remainingPointCoordinates.lat(), remainingPointCoordinates.lng());
    }
  }, [lastWaypoint, showMarker]);
  

  const fetchNearbyRestaurants = async (lat, lng) => {
    if (!remainingPointCoordinates) {
      console.error('Remaining point coordinates are not available.');
      return;
    }
  
    const request = {
      location: { lat, lng },
      radius: 100000, // 5km radius
      name: 'ev charging stations' // Search for charging stations
    };
  
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, async (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let minDuration = Infinity;
        let minDurationMarker = null;
        let minDurationCoords = null;
  
        for (const place of results) {
          const markerPosition = place.geometry.location;
          const request = {
            origin: startLocation,
            destination: endLocation,
            waypoints: [{ location: markerPosition, stopover: true }],
            travelMode: 'DRIVING'
          };
  
          const response = await new Promise(resolve => {
            directionsService.route(request, (response, status) => {
              if (status === 'OK') {
                resolve(response);
              } else {
                resolve(null);
              }
            });
          });
  
          if (response) {
            const totalDuration = response.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);
            if (totalDuration < minDuration) {
              minDuration = totalDuration;
              minDurationMarker = markerPosition;
              minDurationCoords = {
                lat: markerPosition.lat(),
                lng: markerPosition.lng()
              };
            }
          }
        }
  
        if (minDurationMarker) {
          const chosenStation = results.find(place => place.geometry.location.equals(minDurationMarker));
          const stationName = chosenStation ? chosenStation.name : 'Chosen Charging Station';
          const stationAddress = chosenStation ? chosenStation.geometry.location : 'Address';
          const chosenMarker = new window.google.maps.Marker({
            position: minDurationMarker,
            map: map,
            title: stationName,
            address: stationAddress,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              scaledSize: new window.google.maps.Size(60, 60)
            }
          });
  
          addWaypointAndRecalculateRoute(minDurationMarker);
          setChosenCoordinates(minDurationCoords);

          //findNextRoute(minDurationCoords, endLocation);
        }
      }
    });
  };

  const fetchNewRouteStations = async (lat, lng) => {
    if (!remainingPointCoordinates) {
      console.error('Remaining point coordinates are not available.');
      return;
    }
  
    const request = {
      location: { lat, lng },
      radius: 100000, // 5km radius
      name: 'ev charging stations' // Search for charging stations
    };
  
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, async (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let minDuration = Infinity;
        let minDurationMarker = null;
        let minDurationCoords = null;
  
        for (const place of results) {
          const markerPosition = place.geometry.location;
          const request = {
            origin: startLocation,
            destination: endLocation,
            waypoints: [{ location: markerPosition, stopover: true }],
            travelMode: 'DRIVING'
          };
  
          const response = await new Promise(resolve => {
            directionsService.route(request, (response, status) => {
              if (status === 'OK') {
                resolve(response);
              } else {
                resolve(null);
              }
            });
          });
  
          if (response) {
            const totalDuration = response.routes[0].legs.reduce((acc, leg) => acc + leg.duration.value, 0);
            if (totalDuration < minDuration) {
              minDuration = totalDuration;
              minDurationMarker = markerPosition;
              minDurationCoords = {
                lat: markerPosition.lat(),
                lng: markerPosition.lng()
              };
            }
          }
        }
  
        if (minDurationMarker) {
          const chosenStation = results.find(place => place.geometry.location.equals(minDurationMarker));
          const stationName = chosenStation ? chosenStation.name : 'Chosen Charging Station';
          const stationAddress = chosenStation ? chosenStation.geometry.location : 'Address';
          const chosenMarker = new window.google.maps.Marker({
            position: minDurationMarker,
            map: map,
            title: stationName,
            address: stationAddress,
            icon: {
              url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
              scaledSize: new window.google.maps.Size(60, 60)
            }
          });
  
          addWaypointAndRecalculateRoute(minDurationMarker);
          // Instead of setting chosen coordinates, set a different variable
          setNewRouteCoordinates(minDurationCoords);
  
          // Optionally, you can call the findNextRoute function here if needed
          // findNextRoute(minDurationCoords, endLocation);
        }
      } else {
        console.error('Nearby search request failed due to ' + status);
      }
    });
  };
  

  const calculateMidpointNumber = async (minDurationCoords, endLocation) => {
    if (!minDurationCoords || !endLocation) {
      console.error('Missing coordinates or end location.');
      return;
    }
  
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: endLocation }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const endCoords = results[0].geometry.location;
  
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(minDurationCoords.lat, minDurationCoords.lng),
          endCoords
        );
  
        const totalRangeValue = parseFloat(totalRange);
        if (isNaN(totalRangeValue) || totalRangeValue <= 0) {
          console.error('Invalid total range value.');
          return;
        }
  
        const remainingDistance = distance / 1000; // Convert to kilometers
        const rangeRatio = remainingDistance / totalRangeValue;
        setMidpointNum(rangeRatio);
        console.log('Remaining Distance / Total Range Ratio:', rangeRatio);
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }

    });
  };
  
  useEffect(() => {
    if (chosenCoordinates) {
      findNextRoute(chosenCoordinates, endLocation); // Pass chosenCoordinates and endLocation as parameters
      // Set the flag to true after finding the route
    }
  }, [chosenCoordinates]);  // Add chosenCoordinates to the dependency array to trigger the effect when it changes
   // Add chosenCoordinates to the dependency array to trigger the effect when it changes
  
  const findNextRoute = async (minDurationCoords, endLocation) => { // Make the function asynchronous
    const request = {
      origin: minDurationCoords,
      destination: endLocation,
      travelMode: 'DRIVING'
    };
  
    directionsService.route(request, (response, status) => {
      if (status === 'OK') {
        const route = response.routes[0];
        const routePath = route.overview_path;
  
        // Calculate midpoints
        calculateMidpointNumber(chosenCoordinates, endLocation);
        console.log(midpointNum);
        const numMidpoints = Math.floor(midpointNum);
        const segmentLength = routePath.length / (numMidpoints + 1);
        const midpoints = [];
  
        for (let i = 1; i <= numMidpoints; i++) {
          const index = Math.round(i * segmentLength);
          const midpoint = routePath[index];
          midpoints.push(midpoint);
  
          // Create marker for midpoint
          // const marker = new window.google.maps.Marker({
          //   position: midpoint,
          //   map: map, // Make sure map is accessible within this scope
          //   title: `Midpoint ${i}`
          // });
        }
  
        // Log coordinates of midpoints
        midpoints.forEach((midpoint, index) => {
          console.log(`Midpoint ${index + 1} Coordinates:`, midpoint.lat(), midpoint.lng());
          fetchNewRouteStations(midpoint.lat(), midpoint.lng())
        });
      } else {
        console.error('Directions request failed due to ' + status);
      }
    });
  };

  const calculateRemainingPointCoordinates = (google) => {
    if (!startLocation) {
      console.error('Start location is not defined.');
      return;
    }
  
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: startLocation }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const start = results[0].geometry.location;
        const end = new window.google.maps.LatLng(lastWaypoint.lat, lastWaypoint.lng);
        const routeCoordinates = directionsRenderer.getDirections().routes[0].overview_path;
  
        const totalRouteLength = google.maps.geometry.spherical.computeLength(new google.maps.Polyline({ path: routeCoordinates }).getPath());
        const targetDistance = remainingDistance * 1000; // Convert 200 km to meters
        let accumulatedDistance = 0;
        let closestPoint = routeCoordinates[0];
  
        for (let i = 1; i < routeCoordinates.length; i++) {
          const distance = google.maps.geometry.spherical.computeDistanceBetween(routeCoordinates[i - 1], routeCoordinates[i]);
          accumulatedDistance += distance;
  
          if (accumulatedDistance >= targetDistance) {
            closestPoint = google.maps.geometry.spherical.interpolate(routeCoordinates[i - 1], routeCoordinates[i], (targetDistance - (accumulatedDistance - distance)) / distance);
            break;
          }
        }
  
        setRemainingPointCoordinates(closestPoint);
  
        // const marker = new window.google.maps.Marker({
        //   position: closestPoint,
        //   map: map,
        //   title: 'Remaining Point'
        // });

        console.log('Remaining Point Coordinates:', closestPoint.lat(), closestPoint.lng());
      } else {
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  };
  
  const startDirections = () => {
    console.log('Starting directions...');
    
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
        alert('Failed to start navigation. Please check console for details.');
      }
    });
  };

  const saveRouteAsJson = () => {
    // Create an object to represent the route data
    const routeData = {
      startLocation,
      endLocation,
      totalTime,
      remainingDistance,
      route: directionsRenderer.getDirections().routes[0]
      // Add more properties as needed
    };

    // Convert the route data object to a JSON string
    const routeJson = JSON.stringify(routeData, null, 2);

    // Create a Blob containing the JSON data
    const blob = new Blob([routeJson], { type: 'application/json' });

    // Create a temporary <a> element to trigger the download
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'route_data.json'; // File name
    a.click();

    // Cleanup
    URL.revokeObjectURL(a.href);
  };
  

  useEffect(() => {
    if (lastWaypoint) {
      console.log('Last Waypoint Coordinates:', lastWaypoint);
    }
  }, [lastWaypoint]);

  const navigate = useNavigate();

  return (
    <div className="App mt-20">
      <Navbar />
      <div className="flex mx-5">
        <div className='w-1/3'>
        <div className='border-2 p-2 m-5 rounded-sm grid grid-cols-3 place-items-center'>
          <p className='grid place-items-center'><SOS size={20}/> Services</p>
          <p className='grid place-items-center' onClick={()=>navigate('../cabService')}><FaTaxi size={50}/>Cab Services</p>
          <p className='grid place-items-center' onClick={()=>navigate('../towService')}><TbCarCrane size={50}/>Tow Services</p>
        </div>
        <div className='m-5 p-5 h-fit shadow-md shadow-slate-500 text-black border rounded-sm grid place-items-center'>
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
                    height={55}
                    width={80}
                />
                <motion.input
                    className="w-4/5 text-lg font-semibold pl-5 outline-none text-white"
                    type="text"
                    placeholder="Source"
                    value={startLocation}
                    id="startLocation"
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
                    className="w-full text-lg font-semibold pl-5 outline-none text-white"
                    type="text"
                    placeholder="Destination"
                    id="endLocation"
                    value={endLocation}
                    onChange={(e) => setEndLocation(e.target.value)}
                />
            </motion.div>
            <motion.div className='flex w-full bg-[#1e1e44] shadow-md border shadow-gray-800 rounded-lg m-4'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                  <div className='mx-5 my-3'>
                    <IoMdBatteryCharging size={30} color='white'/>
                  </div>
                <motion.input
                    className="w-4/5 text-lg font-semibold pl-5 outline-none text-white"
                    type="number"
                    placeholder="Battery Percentage"
                    id="remainingBattery"
                    value={remainingBattery}
                    onChange={(e) => setRemainingBattery(e.target.value)}
                    min="0"
                    max="100"
                />
            </motion.div>
            <motion.div className='flex w-full bg-[#1e1e44] shadow-md border shadow-gray-800 rounded-lg m-4'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                  <div className='mx-5 my-3'>
                <GiPathDistance size={30} color='white'/>
                </div>
                <motion.input
                    className="w-4/5 text-lg font-semibold pl-5 outline-none text-white"
                    type="number"
                    placeholder="Total Range"
                    id="totalRange"
                    value={totalRange}
                    onChange={(e) => setTotalRange(e.target.value)}
                    min="1"
                />
            </motion.div>
            <motion.div className='flex w-full bg-[#1e1e44] shadow-md border shadow-gray-800 rounded-lg m-4'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <div className='mx-5 my-3'>
                  <BsFillFuelPumpFill size={30} color='white' />
                </div>
                <motion.input
                    className="w-4/5 text-lg font-semibold pl-5 outline-none text-white"
                    type="number"
                    placeholder="Efficiency in Wh/km"
                    id="energyConsmp"
                    value={energyConsmp}
                    onChange={(e) => setEnergyConsmp(e.target.value)}
                    min="1"
                />
            </motion.div>
            
          </div>
          </div>
          <div className='w-3/4'>
            <div className='flex justify-center items-center'>
              <motion.button className='flex bg-[#1e1e44] shadow-md border text-white shadow-gray-800 rounded-2xl m-4 p-3 px-5'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={calculateRemainingDistance}>
                        Calculate Remaining Distance
                </motion.button>
                <motion.button className='flex bg-[#1e1e44] shadow-md border text-white shadow-gray-800 rounded-2xl m-4 p-3 px-5'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={planTrip}>
                        Plan Trip
                </motion.button>
                <div className='border-2 py-2 px-3 m-2 rounded-lg'>
                  {totalTime && <div className='grid place-items-center'><p >Total Time</p><p className='font-semibold'>{totalTime}</p></div>}
                  </div>
                  <div className='border-2 py-2 px-3 m-2 rounded-lg'>
                  {remainingDistance && <div className='grid place-items-center'><p >Possible Distance</p><p className='font-semibold'>{remainingDistance}</p></div>}
                  </div>
                </div>
            <div className="flex-grow mx-5 h-fit shadow-md shadow-slate-500 text-white border rounded-sm">
                  <div id="map" style={{ height: '500px', marginTop: '10px' }}></div>
              </div>
              <button onClick={saveRouteAsJson} className='rounded-sm p-2 m-4 bg-gray-500 text-white'>Save Route as JSON</button>
            </div>
      </div>
      
      
    </div>
  );
};

export default MapContainer;
