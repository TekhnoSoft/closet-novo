import React, { useEffect } from 'react';
import './style.css';
import CategoryItem from '../CategoryItem';
import Utils from '../../Utils';

const startSwipperLogic = () => {

    let elementsArray = [
        document.querySelector('.items-category')
    ];

    let isDown = false;
    let startX;
    let scrollLeft;

    const end = (s) => {
        isDown = false;
        s.classList.remove('active');
    }

    const start = (e, s) => {
        isDown = true;
        s.classList.add('active');
        startX = e.pageX || e.touches[0].pageX - s.offsetLeft;
        scrollLeft = s.scrollLeft;	
    }
    
    const move = (e, s) => {
        if(!isDown) return;

        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX - s.offsetLeft;
        const dist = (x - startX);
        s.scrollLeft = scrollLeft - dist;
    }

    elementsArray.forEach(function(slider) {

        if(slider){
            slider.addEventListener('mousedown', function (e) { start(e, slider) });
            slider.addEventListener('touchstart', function (e) { start(e, slider) });
            slider.addEventListener('mousemove', function (e) { move(e, slider) });
            slider.addEventListener('touchmove', function (e) { move(e, slider) });
            slider.addEventListener('mouseleave', function () {end(slider) });
            slider.addEventListener('mouseup', function () { end(slider) });
            slider.addEventListener('touchend', function () { end(slider) });
        }

    });

}

export default ({categories}) => {

    useEffect(() => {
        startSwipperLogic();
    }, [])

    return (
        <>
            <div className={`wrapper ${Utils.mobileCheck() ? 'mb-2' : 'mb-4'} mt-1`}>
                <ul className="items-category">
                    {categories?.map((a, index) => (
                        <CategoryItem index={index} id={a?.id_category} imagem={a?.image} nome={a?.name} />
                    ))}
                </ul>
            </div>
        </>
    )
}
