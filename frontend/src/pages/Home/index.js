import React, { useContext, useEffect, useState } from 'react';
import { CarouselView, Container, FragmentView, GridCardView, SpaceBox } from '../../components';
import GridProductView from '../../components/GridProductView';
import CategoryList from '../../components/CategoryList';
import { MainContext } from '../../helpers/MainContext';
import ConstData from '../../helpers/ConstData';

export default () => {

    const {categories} = useContext(MainContext);

    const [itemsCarousel, setItemsCarousel] = useState([
        {
            id: 0,
            title: "Bem vindo!",
            description: "Que tal ficar com o closet novo?",
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
            ctaText: "Ver mais",
            ctaLink: "/"
        },
        {
            id: 0,
            title: "Bem vindo!",
            description: "Que tal ficar com o closet novo?",
            image: "https://www.galaxcommerce.com.br/sistema/upload/3785/produtos/bolsa-gucci-marmont-shoulder-preta_2022-07-28_13-54-34_0_436.png",
            ctaText: "Ver mais",
            ctaLink: "/"
        }
    ]);

    const [itemsCarousel2, setItemsCarousel2] = useState([
        {
            id: 0,
            title: "O luxo que você busca!",
            description: "O luxo que você busca está á um clique de distância.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwrdWZQH-ke6ZpZpD4rP18XIc0gG6sr89Vbg&s",
            ctaText: "Ver mais",
            ctaLink: "/"
        },
        {
            id: 0,
            title: "Bem vindo!",
            description: "Que tal ficar com o closet novo?",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwrdWZQH-ke6ZpZpD4rP18XIc0gG6sr89Vbg&s",
            ctaText: "Ver mais",
            ctaLink: "/"
        }
    ]);

    const [products, setProducts] = useState(ConstData.PRODUCTS);
    const [productsSapatos, setProductsSapatos] = useState(ConstData.PRODUCTS);
    const [productsRelogios, setProductsRelogios] = useState(ConstData.PRODUCTS);
    const [itemsCardView, setItemsCardView] = useState([]);

    return (
        <FragmentView noPaddingContainer>
            <CarouselView items={itemsCarousel}/>
            <SpaceBox space={10}/>
            <Container center>
                <CategoryList categories={categories}/>
            </Container>
            <SpaceBox space={10}/>
            <Container center>
                <GridProductView icon={<ion-icon style={{color: 'gray'}} name="pricetag-outline" />} title={"Bolsas em destaque"} products={products} />
            </Container>
            <SpaceBox space={10}/>
            <Container>
                <GridCardView items={itemsCardView}/>
            </Container>
            <SpaceBox space={10}/>
            <CarouselView items={itemsCarousel2}/>
            <SpaceBox space={20}/>
            <Container center>
                <GridProductView icon={<ion-icon style={{color: 'gray'}} name="footsteps-outline" />} title={"Sapatos de luxo"} products={productsSapatos} />
            </Container>
            <SpaceBox space={10}/>
        </FragmentView>
    )
}
