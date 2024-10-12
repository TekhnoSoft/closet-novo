import React from 'react';
import './style.css';
import Utils from '../../Utils';
import SpaceBox from '../SpaceBox';

export default ({children, style, className, center, space}) => {
  return (
    <>
      {space ? <SpaceBox space={space}/> : null}
      <div className={className} style={{...style, justifyContent: 'center', display: 'flex', width: '100%'}}>
        <div style={{width: Utils?.mobileCheck() ? '100%' : '70%', margin: Utils?.mobileCheck() ? '0 10px 0 10px' : undefined}}>
          {children}
        </div>
      </div>
      {space ? <SpaceBox space={space}/> : null}
    </>
  );
};
