// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./SOS.css"; // Import a CSS file for styling

// const SOS = () => {
//   const [counter, setCounter] = useState(40);
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     const makeSOSCall = async () => {
//       console.log("Calling SOS!");
//       try {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             async (position) => {
//               const { latitude, longitude } = position.coords;
//               setCurrentLocation({ latitude, longitude });

//               // Print the latitude and longitude
//               console.log("Latitude:", latitude);
//               console.log("Longitude:", longitude);

//               // Use axios to make your HTTP request here
//               // For example, you can make a POST request to an SOS endpoint
//               const response = await axios.post(
//                 `http://localhost:5000/send-whatsapp?latitude=${latitude}&longitude=${longitude}`
//               );
//               console.log("SOS call successful:", response.data);
//             },
//             (error) => {
//               console.error("Error getting location:", error.message);
//             }
//           );
//         } else {
//           console.error("Geolocation is not supported by this browser");
//         }
//       } catch (error) {
//         console.error("Error making SOS call:", error);
//       }
//     };

//     const interval = setInterval(() => {
//       setCounter((prevCounter) => {
//         const newCounter = prevCounter - 1;
//         const limitedCounter = newCounter >= 0 ? newCounter : 0;

//         if (limitedCounter === 30) {
//           makeSOSCall();
//         }

//         return limitedCounter;
//       });
//     }, 1000);

//     // Cleanup interval when the component is unmounted
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="sos-container">
//       <div className="battery-indicator">
//         <p className="battery-text">{counter}%</p>
//         <div
//           className={`battery-progress ${counter < 30 ? "low" : ""}`}
//           style={{ height: `${counter}%` }}
//         ></div>
//       </div>
//     </div>
//   );
// };

// export default SOS;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SOS.css"; // Import a CSS file for styling

const SOS = () => {
  const [counter, setCounter] = useState(40);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const makeSOSCallAndSendSms = async () => {
      console.log("Calling SOS and Sending SMS!");
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              setCurrentLocation({ latitude, longitude });

              // Print the latitude and longitude
              console.log("Latitude:", latitude);
              console.log("Longitude:", longitude);

              // Use axios to make your HTTP requests here
              // For example, you can make a POST request to both SOS and SMS endpoints
              const sosResponse = await axios.post(
                `http://localhost:5000/send-whatsapp?latitude=${latitude}&longitude=${longitude}`
              );
              console.log("SOS call successful:", sosResponse.data);

              const smsResponse = await axios.post(
                "http://localhost:5000/send-sms?latitude=${latitude}&longitude=${longitude}",
                {
                  message: "SOS: Emergency! Please check my location.",
                  // Add any additional data needed for your SMS service
                }
              );
              console.log("SMS sent successfully:", smsResponse.data);
            },
            (error) => {
              console.error("Error getting location:", error.message);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser");
        }
      } catch (error) {
        console.error("Error making SOS call and sending SMS:", error);
      }
    };

    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        const newCounter = prevCounter - 1;
        const limitedCounter = newCounter >= 0 ? newCounter : 0;

        if (limitedCounter === 30) {
          makeSOSCallAndSendSms();
        }

        return limitedCounter;
      });
    }, 1000);

    // Cleanup interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="sos-container">
      <div className="battery-indicator">
        <p className="battery-text">{counter}%</p>
        <div
          className={`battery-progress ${counter < 30 ? "low" : ""}`}
          style={{ height: `${counter}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SOS;
