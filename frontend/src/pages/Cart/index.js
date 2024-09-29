import React, { useContext, useEffect } from 'react';
import './style.css';
import { FragmentView, If } from '../../components';
import { MainContext } from '../../helpers/MainContext';

export default () => {

    const { cart, getCartPrice } = useContext(MainContext);

    useEffect(() => {
        console.log(cart);
        console.log(getCartPrice())
    }, [])

    return (
        <FragmentView noPaddingContainer>
            
        </FragmentView>
    )
}
