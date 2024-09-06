import React from 'react';
import './style.css';
import Utils from '../../Utils';

export default ({children, style, className, center}) => {
  return (
    <div className={className} style={{...style, justifyContent: 'center', display: 'flex', width: '100%'}}>
      <div style={{width: Utils?.mobileCheck() ? '100%' : '70%', margin: Utils?.mobileCheck() ? '0 10px 0 10px' : undefined}}>
        {children}
      </div>
    </div>
  );
};
