import React, { useContext } from 'react';
import './style.css';
import { MainContext } from '../../helpers/MainContext';

export default ({index, product}) => {

  const { addToCart } = useContext(MainContext);

  const handleClick = () => {
    addToCart(product, 1);
  }

  return (
    <div key={index} onClick={handleClick} className="product-item">
        <img src={product.image} alt={product.name} className="product-image" />
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
                <span className="product-price">{Number(product.price)?.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
            </div>
        </div>
    </div>
  )
}
