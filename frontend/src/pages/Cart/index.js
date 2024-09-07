import React, { useContext, useEffect } from 'react';
import './style.css';
import { FragmentView } from '../../components';
import { MainContext } from '../../helpers/MainContext';

export default () => {

    const { cart } = useContext(MainContext);

    useEffect(() => {
        console.log(cart);
    }, [])

    return (
        <FragmentView noPaddingContainer>
            
        </FragmentView>
    )
}
