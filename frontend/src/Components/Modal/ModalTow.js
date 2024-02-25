import React, { useState, useEffect } from "react";
import location from "../../Images/location.png";
import tariff from "../../Images/gas-pump.png";
import call from "../../Images/phone-call.png";
import tow from "../../Images/tow.jpg";
import clock from "../../Images/clock.png";
import car from "../../Images/car.png";
import charge from "../../Images/charge.png";
import "./Modal.css";
import { motion, AnimatePresence } from "framer-motion";

const ModalTow = ({ chargingS, onClose }) => {
  const startDigits = ["7", "8", "9"];
  let phoneNumber = "";
  for (let i = 0; i < 10; i++) {
    const startDigit =
      startDigits[Math.floor(Math.random() * startDigits.length)];
    phoneNumber =
      "+91 " + startDigit + Math.floor(100000000 + Math.random() * 900000000);
  }
  const Details = {
    contact_numbers: phoneNumber,
  };
  const chargingStation = {
    id: 1,
    Title: chargingS.name,
    Location: chargingS.vicinity,
    PhoneNumber: Details.contact_numbers,
  };

  useEffect(() => {
    // Open the modal when the component mounts
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

                <div className="flex  mb-4">
                  <img
                    src={call}
                    className="w-7 h-6 object-cover pr-1.5"
                    alt="call"
                  />
                  <p className="pr-1.5"> {chargingStation.PhoneNumber}</p>
                </div>
              </div>
              <div className="">
                <img
                  src={tow}
                  className="w-40 h-28  object-cover rounded-xl"
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
export default ModalTow;
