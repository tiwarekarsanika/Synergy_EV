import React, { useState, useEffect } from "react";
import location from "../../Images/location.png";
import tariff from "../../Images/gas-pump.png";
import call from "../../Images/phone-call.png";
import ev from "../../Images/evCharge.jpg";
import clock from "../../Images/clock.png";
import car from "../../Images/car.png";
import charge from "../../Images/charge.png";
import "./Modal.css";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Modal = ({ chargingS, onClose }) => {
  //console.log(chargingS.name)
  // const Details = async () => {
  //   await axios
  //     .get("")
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err));
  // };

  // var chargingStation = {
  //   id: 1,
  //   Title: chargingS.name,
  //   Location: chargingS.vicinity,
  //   //   "contact_numbers": "[\"+919582413687\"]"
  //   // Available: "2",
  //   // SocketType: "5A/15A Socket",
  //   // PhoneNumber: "+91 9311631725",
  //   // Tariff: "Rs 20/unit",
  //   // VehicleType:  "['2W', '3W']",
  // };

  var [chargingStation, setChargingStation] = useState({
    id: 1,
    Title: chargingS.name,
    Location: chargingS.vicinity,
    Available: "2",
    SocketType: "5A/15A Socket",
    PhoneNumber: "+91 9311631725",
    Tariff: "Rs 20/unit",
    VehicleType: "['2W', '3W']",
  });

  const myFunction = async () => {
    try {
      const randomFloat = Math.random();

      // Multiply by 10 to get a range between 0 (inclusive) and 10 (exclusive)
      const randomInRange = randomFloat * 10;

      // Round down to the nearest integer
      const int = Math.floor(randomInRange);
      const response = await axios.get('http://localhost:5000/ev-stations');
      console.log(response.data);

      setChargingStation({
        id: 1,
        Title: chargingS.name,
        Location: chargingS.vicinity,
        Available: response.data[int].available || "Not Available",
        SocketType: response.data[int].type || "Not Available",
        PhoneNumber: response.data[int].contact_numbers || "Not Available",
        Tariff: response.data[int].cost_per_unit || "Not Available",
        VehicleType: response.data[int].vehicle_type || "Not Available",
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    myFunction();
    // Open the modal when the component mounts
    console.log(chargingStation);
    document.getElementById("my_modal_2").showModal();
  }, []);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>
        Open modal
      </button> */}
      <dialog id="my_modal_2" className="modal">
        <div className="position modal-box w-72">
          <div className="part1">
            <div className="pb-4">
              <h3 className="font-bold text-lg">{chargingStation.Title}</h3>
              <div className="flex pb-2.5">
                <p className="font-bold text-lime-600">Open </p>
                <p className=" pl-1.5">until 10pm </p>
              </div>
            </div>
            <div className="flex">
              <div>
                <div className="flex  mb-4">
                  <img
                    src={location}
                    className="w-6 h-6 object-cover pr-1.5"
                    alt="location"
                  />
                  <p className="pr-1.5 whitespace-normal break-words truncate max-w-[280px]">
                    {chargingStation.Location}
                  </p>
                </div>
                <div className="flex  mb-4 ">
                  <img
                    src={tariff}
                    className="w-7 h-6 object-cover pr-1.5"
                    alt="tariff"
                  />
                  <p className="pr-1.5">{chargingStation.Tariff}</p>
                </div>
                <div className="flex  mb-4">
                  <img
                    src={call}
                    className="w-7 h-6 object-cover pr-1.5"
                    alt="call"
                  />
                  <p className="pr-1.5"> {chargingStation.PhoneNumber}</p>
                </div>
                <div className="flex flex-row">
                  <div className="flex  mb-4 ">
                    <img
                      src={clock}
                      className="w-7 h-6 object-cover pr-1.5"
                      alt="call"
                    />
                    <p className="pr-2 "> {chargingStation.Available}</p>
                  </div>
                  <div className="flex  mb-4">
                    <img
                      src={charge}
                      className="w-7 h-6 object-cover pl-1.5"
                      alt="call"
                    />
                    <p className="pl-1.5"> {chargingStation.SocketType}</p>
                  </div>
                </div>
                <div className="flex  mb-4">
                  <img
                    src={car}
                    className="w-7 h-6 object-cover pr-1"
                    alt="call"
                  />
                  <p className="pr-1.5"> {chargingStation.VehicleType}</p>
                </div>
              </div>
              <div className="">
                <img
                  src={ev}
                  className="w-32 h-32 mt-[70%] object-cover rounded-xl"
                  alt="ev"
                />
              </div>
            </div>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop"
          // onClick={() => document.getElementById('my_modal_2').close()}
          onClick={onClose}
        >
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
};
export default Modal;
