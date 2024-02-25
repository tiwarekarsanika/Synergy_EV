import React, { useState, useEffect } from "react";
import ModalTow from "../Components/Modal/ModalTow";
import Navbar from "../Components/Navbar";

const TowService = () => {
  return (
    <div className=" ">
      <div className="bg-moon w-full h-full">
        <Navbar />
        <Map />
        {/* <Modal/> */}
      </div>
    </div>
  );
};

function Map() {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [inputLocation, setInputLocation] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setPosition(position);
      });
    }
  }, []);

  const handleUseCurrentLocation = () => {
    if (position) {
      fetchNearbyChargingStations(
        position.coords.latitude,
        position.coords.longitude
      );
    }
  };

  const handleInputLocation = () => {
    setShowInput(true);
  };

  const handleSubmitLocation = () => {
    if (inputLocation.trim() !== "") {
      setShowInput(false);
      fetchLocationCoordinates(inputLocation);
    }
  };

  const fetchLocationCoordinates = async (location) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const locationCoords = results[0].geometry.location;
        fetchNearbyChargingStations(locationCoords.lat(), locationCoords.lng());
      } else {
        alert("Geocoding failed. Please try again with a different location.");
      }
    });
  };

  const fetchNearbyChargingStations = (latitude, longitude) => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: latitude, lng: longitude },
      zoom: 15,
    });

    const request = {
      location: map.getCenter(),
      radius: "5000",
      name: ["towing service"],
    };

    const service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const filteredResults = results.filter(
          (place) => place.business_status === "OPERATIONAL"
        );
        setFilteredResults(filteredResults);
        setMarkers(
          filteredResults.map((place) => {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
            });

            marker.addListener("click", () => {
              setSelectedPlace(place);
            });

            return marker;
          })
        );
      }
    });
  };

  useEffect(() => {
    //console.log(selectedPlace);
  }, [selectedPlace]);

  return (
    <div className="shadow-slate-500 mt-32 ml-8 w-8/12  border rounded-sm overflow-hidden">
      <div className="flex">
        <button
          onClick={handleUseCurrentLocation}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        >
          Use Current Location
        </button>
        <button
          onClick={handleInputLocation}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
        >
          Input Location
        </button>
        {showInput && (
          <div className="flex ml-4">
            <input
              type="text"
              placeholder="Enter location..."
              className="h-10 mt-5 border rounded-md p-2"
              value={inputLocation}
              onChange={(e) => setInputLocation(e.target.value)}
            />
            <button
              onClick={handleSubmitLocation}
              className="bg-blue-500 mt-5 h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
            >
              Submit
            </button>
          </div>
        )}
      </div>
      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
          marginTop: "45px",
          marginBottom: "45px",
          marginLeft: "20px",
          marginRight: "20px",
        }}
      ></div>
      {selectedPlace && (
        <ModalTow
          chargingS={selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </div>
  );
}

export default TowService;
