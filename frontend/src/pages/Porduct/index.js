import React, { useContext, useEffect, useState } from 'react';
import { Button, FragmentView, If, SpaceBox } from '../../components';
import './style.css';
import Utils from '../../Utils';
import GridProductView from '../../components/GridProductView';
import { MainContext } from '../../helpers/MainContext';
import ConstData from '../../helpers/ConstData';

const startupLogics = () => {
    const sliderMainImage = document.getElementById("product-main-image");
    const sliderImageList = document.querySelectorAll(".image-list");
    for (let i = 0; i < sliderImageList.length; i++) {
        sliderImageList[i].onclick = function () {
            sliderMainImage.src = sliderImageList[i].src;
        };
    }
}

const ProductImages = ({ images }) => {
    const [mainImage, setMainImage] = useState(images[0]);
  
    return (
      <div className="product-image-v">
        <div className="product-image-main">
          <img src={mainImage} alt="Product main" id="product-main-image" />
        </div>
        <div className="product-image-slider">
          {images?.map((item, index) => (
            <img
              key={index}
              src={item}
              alt={`Product image ${index}`}
              className="image-list"
              onClick={() => setMainImage(item)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  const ProductInfo = ({ product, handleAddToCart }) => (
    <div className="product">
      <div className="breadcrumb">
        <span><a href="#">Início</a></span>
        <span><a href="#">Produto</a></span>
        <span className="active">Bolsa</span>
      </div>
  
      <div className="product-title"><h2>{product.name}</h2></div>
      <div className="product-rating"><span className="review">Ref: <b>{product.ref}</b></span></div>
      <div className="product-rating"><span className="review">Categoria: <b>{product.category}</b></span></div>
      <div className="product-rating"><span className="review">Situação: <b>{product.condition}</b></span></div>
  
      <div className="product-price">
        <span className="offer-price">R$ {product.offerPrice}</span>
        <span className="sale-price">R$ {product.salePrice}</span>
      </div>
  
      <div className="product-details">
        <h3>Descrição</h3>
        <p>{product.description}</p>
      </div>
  
      <Button onClick={handleAddToCart} style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
        <ion-icon name="bag-outline"></ion-icon>&nbsp;<b>Comprar Agora</b>
      </Button>
    </div>
  );
  
  const ProductView = ({ product, products, handleAddToCart }) => {
    const isMobile = Utils.mobileCheck();
  
    return (
      <div className="container">
        <div className="single-product">
          <div className="row">
            <div className={`col-6 product-images ${isMobile ? 'mobile-images' : ''}`}>
              <ProductImages images={product.images} />
            </div>
            <div className="col-6">
              <ProductInfo product={product} handleAddToCart={handleAddToCart} />
            </div>
          </div>
          <SpaceBox space={15} />
          <GridProductView transparency noAction title="Recomendados pra você!" icon={null} products={products} />
        </div>
      </div>
    );
  };

export default () => {

    const { cart } = useContext(MainContext);

    const [products, setProducts] = useState(ConstData.PRODUCTS);

    useEffect(() => {
        startupLogics();
    }, [])

    const handleAddToCart = () => {
        cart.addToCart(products[1], 1);
    }

    return (
        <FragmentView>
            <SpaceBox space={Utils.mobileCheck() ? 0 : 25} />
            <ProductView product={products[0]} products={products} handleAddToCart={handleAddToCart} />
        </FragmentView>
    )
}

