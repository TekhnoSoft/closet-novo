import React, { useEffect, useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import "react-range-slider-input/dist/style.css";
import './style.css';
import SpaceBox from '../SpaceBox';

export default ({min, max, step, value, label, currencyPrefix, onChange}) => {

    const [sliderValue, setSliderValue] = useState(value);

    useEffect(() => {
        if(onChange){
            onChange(sliderValue);
        }
    }, [sliderValue])

    return (
        <div className='mt-1 mb-1 input-box-range'>
            <div className="input-label-range">{label}</div>
            <SpaceBox space={5}/>
            <div className='mb-1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{fontSize: '10pt'}}>
                    {currencyPrefix ? Number(sliderValue[0]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : sliderValue[0]}
                </span>
                <span style={{fontSize: '10pt'}}>
                    {currencyPrefix ? Number(sliderValue[1]).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : sliderValue[1]}
                </span>
            </div>
            <RangeSlider
                id="range-slider-closet"
                min={min}
                max={max}
                step={step}
                value={sliderValue}
                onInput={setSliderValue}
            />
            <SpaceBox space={5}/>
        </div>
    );
}
