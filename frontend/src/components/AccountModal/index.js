import React, { useContext } from 'react';
import { MainContext } from '../../helpers/MainContext';
import If from '../If';
import Modal from '../Modal';
import './style.css';

export default ({show, setShow}) => {
    const {user} = useContext(MainContext);

    return (
        <If condition={user == null || !user} elseComponent={null}>
            <Modal show={show} setShow={setShow}>
                
            </Modal>
        </If>
    )
}
