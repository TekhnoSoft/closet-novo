import React, { useContext, useEffect } from 'react';
import './style.css';
import { FragmentView, If } from '../../components';
import { MainContext } from '../../helpers/MainContext';

export default () => {

    const { cart } = useContext(MainContext);

    useEffect(() => {
        console.log(cart);
        console.log(cart.getCartPrice())
    }, [])

    return (
        <FragmentView noPaddingContainer>
            
        </FragmentView>
    )
}
