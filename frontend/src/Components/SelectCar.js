import React from 'react';
import './SelectCar.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Cars from './Cars.json'
import MyCarCanvas from '../Pages/MyCar';
import { useNavigate } from 'react-router-dom';

const SelectCar = () => {
    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const navigate = useNavigate()

    return (           
        <div id="main-slider-container">
            <h1 className='font-bold text-xl m-10'>Select your Vehicle</h1>
            <MdChevronLeft size={40} className="slider-icon left" onClick={slideRight} />
            <div id="slider">
                {
                    Cars.map((slide, index) => {
                        return (
                            <div className="slider-card " key={index} onClick={()=>navigate('/home')}>
                                <img className='slider-card-image' src={require(`../Images/${slide.id}.png`)} />
                                <h1 className="font-bold m-5 text-2xl">{slide.brand}</h1>
                                <h1 className="text-lg">{slide.model}</h1>
                            </div>
                        )
                    })
                }
            </div>
            <MdChevronRight size={40} className="slider-icon right" onClick={slideLeft} />
        </div>
    )
}
export default SelectCar;