import React from 'react';
import './style.css';

export default ({index, product}) => {
  return (
    <div key={index} className="product-item">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
            <div>
                <span className="product-name">{product.name}</span>
            </div>
            <div>
              <span style={{fontSize: '12px'}}>Loja Qualquer: </span>
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
