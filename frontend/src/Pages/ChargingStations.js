import React, {useState, useEffect} from 'react'
import Modal from '../Components/Modal/Modal';
import Navbar from '../Components/Navbar';

const ChargingStations = () => {
  
  // const { isLoaded } = useLoadScript({

  //   googleMapsApiKey: "AIzaSyDzjhGRFc6zr04vdTOqLt-gVc9V32S9Lm4",
  //   libraries: ["places"]
  // });

  // if(!isLoaded) return <div>Loading...</div>;

  return (
    

    
    <div className=" ">
      <div className='bg-moon w-full h-full'>
          <Navbar />
        <Map />
        {/* <Modal/> */}
      </div>
    </div>


    
  )
}

function Map() {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [circle, setCircle] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
   const [selectedPlace, setSelectedPlace] = useState(null);
  
  

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
    // const chargingStationIcon = {
    //     url: '/frontend/src/Images/evCharge.jpg', // replace with the path to your charging station marker icon
    //     scaledSize: new window.google.maps.Size(40, 40), // adjust the size as needed
    //   };
      const request = {
        location: map.getCenter(),
        radius: "1000",
        //type: ["doctor"],
        // name: ["therapist"],
        // name: ["psychotherapist"],
        name: ["electric_vehicle_charging_station"],
        // name: ["psychologist"],
        // name: ["counsellor"]
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
            
             marker.addListener("click",() => {
                setSelectedPlace(place);    
                       
            });
             
            return marker;
          }));
        }
      });

    //   const circleOptions = {
    //     strokeColor: "#FF0000",
    //     strokeOpacity: 0.8,
    //     strokeWeight: 2,
    //     fillColor: "#FF0000",
    //     fillOpacity: 0.35,
    //     map: map,
    //     center: { lat: position.coords.latitude, lng: position.coords.longitude },
    //     radius: 500,
    //   };

    //   const circle = new window.google.maps.Circle(circleOptions);
    //   setCircle(circle);
    
    }
  }, [position]);

  useEffect(() => {
    //console.log(selectedPlace);
  }, [selectedPlace]);


  return (
    <div className='shadow-slate-500 mt-32 ml-8 w-8/12  border rounded-sm overflow-hidden'>
        {/* <p className="text-3xl">Available Therapists</p> */}
        <div className="flex">
        <div id="map" style={{ height: "500px", width: "100%", marginTop: "45px",marginBottom: "45px", marginLeft: "20px",marginRight: "20px"}}></div>
        {selectedPlace && <Modal chargingS={selectedPlace} onClose={() => setSelectedPlace(null)} />}
    </div>
  </div>
  );

  
}



export default ChargingStations