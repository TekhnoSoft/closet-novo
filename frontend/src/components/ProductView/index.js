import React, { useContext } from 'react';
import './style.css';
import { MainContext } from '../../helpers/MainContext';
import { useNavigate } from 'react-router-dom';

export default ({index, product}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    window.scrollTo(0, 0);
    navigate(`/product/${product?.id_product}`);
  }

  return (
    <div key={index} onClick={handleClick} className="product-item">
        <img src={product.images[0]} alt={product.name} className="product-image" />
        <div className="product-info">
            <div>
                <span className="product-name">{product.name}</span>
            </div>
            <div>
              <span style={{fontSize: '12px'}}>Outras Lojas: </span>
              <span className="product-price-q">{Number(product.price)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
            <div>
                <span style={{fontSize: '12px'}}>Closet Novo: </span>
                <span className="product-price" style={{justifyContent: 'center'}}>{Number(product.price)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
        </div>
    </div>
  )
}
