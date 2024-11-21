import React, { useEffect, useState } from 'react';
import './style.css';

export default ({activeIndex, items, onChange}) => {

    const [index, setIndex] = useState(activeIndex);

    useEffect(() => {
        handleIndexClick(activeIndex);
    }, [])

    const handleIndexClick = (i) => {
        setIndex(i);
        if(onChange){
            onChange(items?.filter(r => { return r.index == i})[0]);
        }
    }

    return (
        <>
            <div className='mb-1 mt-1'>
                <div style={{display: 'grid', gridTemplateColumns: `repeat(${items?.length}, 1fr)`, justifyContent: 'center', gap: '0px'}}>
                    {items?.map(i => (
                        <div className='period-button' style={{border: index == i?.index ? 'solid 2px #5e8975' : 'solid 2px #ddd', color: index == i?.index ? '#5e8975' : 'gray'}} onClick={() => {handleIndexClick(i?.index)}}>{i.label}</div>
                    ))}
                </div>
            </div>
        </>
    )
}
