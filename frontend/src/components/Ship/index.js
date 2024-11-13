import React from 'react';
import './style.css';

export default ({children, dotStyle, noBorder, cursorPointer}) => {

    return (
        <div className={`dot-parent dot-parent-${dotStyle}`} style={{border: noBorder ? 'none' : undefined, cursor: cursorPointer ? 'pointer' : undefined}}>
            <div className={`dot dot-${dotStyle}`}></div>&nbsp;
            <div>
                {children}
            </div>
        </div>
  )
}
