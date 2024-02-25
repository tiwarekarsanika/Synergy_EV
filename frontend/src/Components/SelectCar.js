import React from 'react';
import './SelectCar.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Cars from './Cars.json'
import MyCarCanvas from '../Pages/MyCar';
import '../Images/Mercedes.png'

const SelectCar = () => {
    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    return (
        <div id="main-slider-container">
            <MdChevronLeft size={40} className="slider-icon left" onClick={slideLeft} />
            <div id="slider">
                {
                    Cars.map((slide, index) => {
                        return (
                            <div className="slider-card" key={index} onClick={()=>slide.onClick()}>
                                <img src={require(`../Images/${slide.brand}.png`)} />
                                <h1 className="font-bold m-5 text-2xl">{slide.brand}</h1>
                                <h1 className="text-lg">{slide.model}</h1>
                            </div>
                        )
                    })
                }
            </div>
            <MdChevronRight size={40} className="slider-icon right" onClick={slideRight} />
        </div>
    )
}
export default SelectCar;