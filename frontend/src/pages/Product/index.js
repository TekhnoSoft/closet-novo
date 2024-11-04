import React, { useContext, useEffect, useState } from 'react';
import { AccountModal, Button, FragmentView, If, SpaceBox } from '../../components';
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

const ProductImages = ({ user, images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  const [showAccountModal, setShowAccountModal] = useState(false);

  const handleFavorite = () => {
    const validUser = user != null || !user;
    setShowAccountModal(validUser);
    if (validUser) { }
  }

  return (
    <>
      <AccountModal show={showAccountModal} setShow={setShowAccountModal} />
      <div className="product-image-v">
        <div className="product-image-main">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'end', textAlign: 'right', width: '100%' }}>
            <ion-icon onClick={handleFavorite} name="heart-outline" style={{ cursor: 'pointer', color: '#5e8975', fontSize: '16pt' }}></ion-icon>
          </div>
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
    </>
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
      <span className="offer-price">{Utils.formatBRL(product.offerPrice)}</span>
      <span className="sale-price">{Utils.formatBRL(product.salePrice)}</span>
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

const ProductView = ({ user, product, products, handleAddToCart }) => {
  const isMobile = Utils.mobileCheck();

  return (
    <div className="container">
      <div className="single-product">
        <div className="row">
          <div className={`col-6 product-images ${isMobile ? 'mobile-images' : ''}`}>
            <ProductImages user={user} images={product.images} />
          </div>
          <div className="col-6">
            <ProductInfo product={product} handleAddToCart={handleAddToCart} />
          </div>
        </div>
        <SpaceBox space={15} />
        <GridProductView transparency noAction noPadding title="Recomendados pra você!" icon={null} products={products} />
      </div>
    </div>
  );
};

export default () => {

  const { user, cart } = useContext(MainContext);

  const [products, setProducts] = useState(ConstData.PRODUCTS);

  useEffect(() => {
    startupLogics();
  }, [])

  const handleAddToCart = () => {
    cart.addToCart(products[2], 1);
    Utils.toast({
      type: "success",
      text: "Produto adicionado a sacola!"
    })
  }

  return (
    <FragmentView>
      <SpaceBox space={Utils.mobileCheck() ? 0 : 25} />
      <ProductView user={user} product={products[2]} products={products} handleAddToCart={handleAddToCart} />
    </FragmentView>
  )
}

