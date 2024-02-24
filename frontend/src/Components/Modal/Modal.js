// import React, { useState } from 'react';

// const Modal = () => {
 
//    return(
//     <>
//     {/* Open the modal using document.getElementById('ID').showModal() method */}
// <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button>
// <dialog id="my_modal_2" className="modal">
//   <div className="modal-box">
//     <h3 className="font-bold text-lg">Title</h3>
//      <div className="flex">
//       <p className="text-lime-600">Open </p>
//        <p className="pl-1.5">until 10pm </p>
//      </div>
//     <div className="flex">
//       <button>Location</button>
//       <button>Location</button>
//      </div>
      
//   </div>
//   <form method="dialog" className="modal-backdrop">
//     <button>close</button>
//   </form>
// </dialog>
//     </>
//    )
// };

// export default Modal;

import React, { useState, useEffect} from 'react';
import location from '../../Images/location.png'
import tariff from '../../Images/gas-pump.png'
import call from '../../Images/phone-call.png'
import ev from '../../Images/evCharge.jpg'
import './Modal.css'
import { motion, AnimatePresence } from "framer-motion";


const Modal = ({chargingS,onClose}) => {
  //console.log(chargingS.name)
  
  const chargingStation = {
    id: 1,
    Title: chargingS.name,
    Location: chargingS.vicinity,
    Tariff: '$1 per hour',
    PhoneNumber: '123-456-7890',
  };

   
  useEffect(() => {
    // Open the modal when the component mounts
    document.getElementById('my_modal_2').showModal();
  }, []);

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>
        Open modal
      </button> */}
      <dialog id="my_modal_2" className="modal">
        <div className="position modal-box w-72">
         
  <div className='part1'>
    <div className='pb-4'>
      <h3 className="font-bold text-lg">{chargingStation.Title}</h3>
      <div className="flex pb-2.5">
        <p className="font-bold text-lime-600">Open </p>
        <p className=" pl-1.5">until 10pm </p>
      </div>
    </div>
    <div className="flex">
    <div>
    <div className="flex  mb-4">
      <img src={location} className='w-6 h-6 object-cover pr-1.5' alt="location"/>
      <p className="pr-1.5 whitespace-normal break-words truncate max-w-[280px]">{chargingStation.Location}</p>
    </div>
    <div className="flex  mb-4 ">
      <img src={tariff} className='w-7 h-6 object-cover pr-1.5' alt="tariff"/>
      <p className="pr-1.5">{chargingStation.Tariff}</p>
    </div>
    <div className="flex  mb-4">
      <img src={call} className='w-7 h-6 object-cover pr-1.5' alt="call"/>
      <p className="pr-1.5"> {chargingStation.PhoneNumber}</p>
    </div>
    </div>
  <div className="">
  <img src={ev} className='w-32 h-32 object-cover rounded-xl' alt="ev" />
</div>
  </div>
</div>
 </div>
<form method="dialog"
          className="modal-backdrop"
          // onClick={() => document.getElementById('my_modal_2').close()}
          onClick={onClose}
        >
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}
export default Modal;

