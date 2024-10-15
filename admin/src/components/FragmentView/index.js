import React, { useEffect } from 'react';

export default ({children}) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <>
            {children}
        </>
    )
}
