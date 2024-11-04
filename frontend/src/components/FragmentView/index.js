import React, { useContext, useEffect } from 'react';
import Container from '../Container';
import Footer from '../Footer';
import SpaceBox from '../SpaceBox';
import Utils from '../../Utils';
import { MainContext } from '../../helpers/MainContext';
import If from '../If';

const FragmentViewContent = ({ children, noMobileSpace, loaded }) => (
    <>
        <If condition={loaded == true} elseComponent={null}>
            <SpaceBox space={Utils.mobileCheck() ? 70 : 75} />
            {children}
            <SpaceBox space={Utils.mobileCheck() ? noMobileSpace ? 0 : 60 : 0} />
        </If>
    </>
)

export default ({ children, noPaddingContainer, noMobileSpace }) => {

    const { loaded } = useContext(MainContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {noPaddingContainer ? (
                <>
                    <FragmentViewContent loaded={loaded} children={children} noMobileSpace={noMobileSpace} />
                </>
            ) : (
                <Container>
                    <FragmentViewContent loaded={loaded} children={children} />
                </Container>
            )}
            <Footer />
        </>
    )
}
