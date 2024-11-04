import React, { useEffect } from 'react';
import Container from '../Container';
import Footer from '../Footer';
import SpaceBox from '../SpaceBox';
import Utils from '../../Utils';

const FragmentViewContent = ({children, noMobileSpace}) => (
    <>
        <SpaceBox space={Utils.mobileCheck() ? 70 : 75}/>
            {children}
        <SpaceBox space={Utils.mobileCheck() ? noMobileSpace ? 0 : 60 : 0}/>
    </>
)

export default ({children, noPaddingContainer, noMobileSpace}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {noPaddingContainer ? (
                <>
                    <FragmentViewContent children={children} noMobileSpace={noMobileSpace}/>
                </>
            ) : (
                <Container>
                    <FragmentViewContent children={children}/>
                </Container>
            )}
            <Footer/>
        </>
    )
}
