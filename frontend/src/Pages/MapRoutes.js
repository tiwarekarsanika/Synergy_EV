import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie';
import Source from '../Images/Source.json'
import Destination from '../Images/Destination.json'
import Battery from '../Images/Battery.json'

function MapRoutes() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [batteryPercentage, setBatteryPercentage] = useState('');

  return (
    <div className="App mt-28">
      <Navbar />
      <div className="flex mx-5">
        <div className='m-5 p-5 h-fit shadow-md shadow-slate-500 w-1/3 text-white border rounded-sm grid place-items-center'>
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
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
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
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
            </motion.div>
            <motion.div className='flex w-full bg-[#1e1e44] shadow-md border shadow-gray-800 rounded-lg m-4'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                <Lottie
                    options={{
                    loop: true,
                    autoplay: true,
                    animationData: Battery,
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
                    placeholder="Battery Percentage"
                    value={batteryPercentage}
                    onChange={(e) => setBatteryPercentage(e.target.value)}
                />
            </motion.div>
            <motion.button className='flex bg-[#1e1e44] shadow-md border shadow-gray-800 rounded-full m-4 p-3 px-5'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}>
                    Get Route
            </motion.button>
          </div>
        <Map/>
      </div>
    </div>
  );
}

function Map() {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [circle, setCircle] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position);
      });
    }
  }, []);

  useEffect(() => {
    if (position) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        zoom: 15,
      });

      const request = {
        location: map.getCenter(),
        radius: "10000",
        name: ["psychiatrist"],
      };

      const service = new window.google.maps.places.PlacesService(map);

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const filteredResults = results.filter((place) => (place.business_status === "OPERATIONAL"));
          setFilteredResults(filteredResults);
          setMarkers(filteredResults.map((place) => {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
            });
            return marker;
          }));
        }
      });

      const circleOptions = {
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: map,
        center: { lat: position.coords.latitude, lng: position.coords.longitude },
        radius: 500,
      };

      const circle = new window.google.maps.Circle(circleOptions);
      setCircle(circle);
    }
  }, [position]);

  return (
    <div className="flex-grow mx-5 h-fit shadow-md shadow-slate-500 w-1/3 text-white border rounded-sm">
      <div className='m-10' id="map" style={{ height: "350px", width: "90%" }}></div>
    </div>
  );
}

export default MapRoutes;
