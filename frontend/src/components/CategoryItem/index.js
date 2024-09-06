import React, { useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Environment from '../../Environment';
import Utils from '../../Utils';

export default ({id, index, imagem, nome}) => {

    const navigate = useNavigate();

    const handleCategoryClick = () => {
        if(id == null) return;

        localStorage.setItem("tk_beauty_search_by_category", nome);
        navigate("/search");
    }

    return (
        <>
            <li key={index} onClick={() => {handleCategoryClick()}} className="item-category" style={{width: Utils?.mobileCheck() ? '75px' : '120px'}}>
                <div className='item-category-icon' style={{width: Utils?.mobileCheck() ? '75px' : '120px', height: Utils?.mobileCheck() ? '75px' : '120px'}}>
                    <img loading="lazy" src={imagem || "placeholder-image.png"}/>
                </div>
                <div className='text-center' style={{textWrap: 'nowrap', overflow: 'hidden'}}>
                    <b className='item-category-b'>{nome}</b>
                </div>
            </li>
        </>
    )
}
