import React, { useContext, useEffect, useState } from 'react';
import { Button, CarouselView, FragmentView, If, SpaceBox } from '../../components';
import './style.css';
import Utils from '../../Utils';
import GridProductView from '../../components/GridProductView';
import { MainContext } from '../../helpers/MainContext';

const startupLogics = () => {
    const sliderMainImage = document.getElementById("product-main-image");
    const sliderImageList = document.querySelectorAll(".image-list");
    for (let i = 0; i < sliderImageList.length; i++) {
        sliderImageList[i].onclick = function () {
            sliderMainImage.src = sliderImageList[i].src;
        };
    }
}

export default () => {

    const { addToCart } = useContext(MainContext);

    const [images, setImages] = useState([
        { image: 'https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg' },
        { image: 'https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png' },
        { image: 'https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg' },
        { image: 'https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png' },
        { image: 'https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg' },
        { image: 'https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg' },
        { image: 'https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png' },
        { image: 'https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg' },
        { image: 'https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png' },
        { image: 'https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg' },
    ]);

    const [products, setProducts] = useState([
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        },
        {
            id_product: 0,
            name: "Bolsa LV",
            price: 120500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-matelasse-loulou-ferragem-dourada-media-bege_2023-02-23_10-45-53_0_453.jpg",
        },
        {
            id_product: 10,
            name: "Bolsa GUCCI",
            price: 220500,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
        },
        {
            id_product: 45323,
            name: "Bolsa LV",
            price: 320500,
            image: "https://m.media-amazon.com/images/I/71yDf+gsd4L._AC_UF1000,1000_QL80_.jpg",
        },
        {
            id_product: 54323,
            name: "Bolsa LV",
            price: 55670,
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-saint-laurent-le-5-a-7-hobo-preta_2023-01-29_20-12-14_0_502.jpg",
        }
    ]);

    useEffect(() => {
        startupLogics();
    }, [])

    const handleAddToCart = () => {
        addToCart(products[0], 1);
    }

    return (
        <FragmentView>
            <SpaceBox space={25} />
            <div class="container">
                <div className="single-product">
                    <div className="row">
                        <div className="col-6 product-images" style={{ height: Utils.mobileCheck() ? 'calc(100vh - 260px)' : undefined }}>
                            <div className="product-image">
                                <div className="product-image-main">
                                    <img src="https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png" alt="" id="product-main-image" />
                                </div>
                                <div className="product-image-slider">
                                    {images?.map(item => (
                                        <img src={item?.image} alt="" className="image-list" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="breadcrumb">
                                <span><a href="#">Início</a></span>
                                <span><a href="#">Produto</a></span>
                                <span className="active">Bolsa</span>
                            </div>

                            <div className="product">
                                <div className="product-title">
                                    <h2>Half Sleve T-shirt for Men</h2>
                                </div>
                                <div className="product-rating">
                                    <span className="review">Ref: <b>#8128932</b></span>
                                </div>
                                <div className="product-rating">
                                    <span className="review">Categoria: <b>Bolsas</b></span>
                                </div>
                                <div className="product-rating">
                                    <span className="review">Situação: <b>Novo</b></span>
                                </div>
                                <div className="product-price">
                                    <span className="offer-price">R$ 99,00</span>
                                    <span className="sale-price">R$ 129,00</span>
                                </div>

                                <div className="product-details">
                                    <h3>Descrição</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos est magnam quibusdam maiores sit perferendis minima cupiditate iusto earum repudiandae maxime vitae nostrum, ea cumque iste ipsa hic commodi tempore.</p>
                                </div>
                                <div className="product-size">
                                    <h4>Tamanho</h4>
                                    <div className="size-layout">
                                        <input type="radio" name="size" value="S" id="1" className="size-input" />
                                        <label for="1" className="size">S</label>

                                        <input type="radio" name="size" value="M" id="2" className="size-input" />
                                        <label for="2" className="size">M</label>

                                        <input type="radio" name="size" value="L" id="3" className="size-input" />
                                        <label for="3" className="size">L</label>

                                        <input type="radio" name="size" value="XL" id="4" className="size-input" />
                                        <label for="4" className="size">XL</label>

                                        <input type="radio" name="size" value="XXL" id="5" className="size-input" />
                                        <label for="5" className="size">XXL</label>
                                    </div>
                                </div>
                                <div className="product-color">
                                    <h4>Cor</h4>
                                    <div className="color-layout">
                                        <input type="radio" name="color" value="black" className="color-input" />
                                        <label for="black" className="black"></label>
                                        <input type="radio" name="color" value="red" className="color-input" />
                                        <label for="red" className="red"></label>

                                        <input type="radio" name="color" value="blue" className="color-input" />
                                        <label for="blue" className="blue"></label>
                                    </div>
                                </div>
                                <span className="divider"></span>
                                <div style={{ display: 'flex' }}>
                                    <Button onClick={handleAddToCart} style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                        &nbsp;&nbsp;&nbsp;
                                        <ion-icon name="bag-outline"></ion-icon>&nbsp;
                                        <b>Comprar Agora</b>
                                        &nbsp;&nbsp;&nbsp;
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <SpaceBox space={15} />
                    <GridProductView transparency noAction title={"Recomendados pra você!"} icon={null} key={0} products={products} />
                </div>
            </div>
        </FragmentView>
    )
}

