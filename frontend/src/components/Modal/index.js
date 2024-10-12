import React, { useEffect } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import Utils from '../../Utils';

const Modal = ({ children, show, setShow, onCloseCallback, style, noPadding }) => {

    const navigate = useNavigate();

    const handleBackdropClick = () => {
        setShow(false);
        if(onCloseCallback){
            onCloseCallback();
        }
        navigate(-1); //se der merda tire essa linha
        window.location.hash = '';
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash !== '#modal') {
                setShow(false);
                window.removeEventListener('hashchange', handleHashChange);
                if(onCloseCallback){
                    onCloseCallback();
                }
            }
        };

        if (show) {
            window.location.hash = 'modal';
            window.addEventListener('hashchange', handleHashChange);
            document.body.style.overflow = 'hidden';  // Trava o scroll
        } else {
            document.body.style.overflow = 'auto';    // Ativa o scroll novamente
        }

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
            document.body.style.overflow = 'auto';    // Ativa o scroll quando o componente desmonta
        };
    }, [show, setShow]);

    return (
        show ? (
            <div style={{...style, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 999999, background: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center' }} onClick={handleBackdropClick}>
                <div style={{ background: '#fff', margin: Utils.mobileCheck() ? '8px' : undefined, padding: noPadding ? '0px' : '20px', borderRadius: '5px', width: Utils.mobileCheck() ? '90%' : '600px'}} onClick={handleContentClick}>
                    {children}
                </div>
            </div>
        ) : null
    );
};

export default Modal;