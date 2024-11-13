import React, { useContext, useState } from 'react';
import { CarouselView, Container, FragmentView, GridCardView, SpaceBox } from '../../components';
import GridProductView from '../../components/GridProductView';
import CategoryList from '../../components/CategoryList';
import { MainContext } from '../../helpers/MainContext';

export default () => {

    const { homeView } = useContext(MainContext);

    const RenderView = ({view}) => {

        const [viewType, setViewType] = useState(view.type);

        switch (viewType) {
            case "CAROUSEL":
                return (
                    <>
                        <CarouselView items={view?.view?.carousel_item} />
                        <SpaceBox space={10} />
                    </>
                )
                break;
            case "CATEGORY":
                return (
                    <>
                        <Container center>
                            <CategoryList categories={view?.view} />
                        </Container>
                        <SpaceBox space={10} />
                    </>
                )
                break;
            case "GRID_PRODUCT":
                return (
                    <>
                        <Container center>
                            <GridProductView icon={<ion-icon style={{ color: 'gray' }} name={view?.view?.icon} />} title={view?.view?.title} ctaText={view?.view?.cta_text} ctaLink={view?.view?.ctaLink} products={view?.view?.grid_product_item} />
                        </Container>
                    </>
                )
                break;
        }
    }

    const sortedHomeView = homeView?.sort((a, b) => a.id - b.id);

    return (
        <FragmentView noPaddingContainer>
            {sortedHomeView?.map(view => {
                return (<RenderView view={view}/>);
            })}
        </FragmentView>
    )
}
