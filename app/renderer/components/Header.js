import React from 'react';

const Header = () => (
    <div style={{height: '150px', overflow: 'hidden'}}>
      <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
        <path d="M-5.64,133.70 C149.99,150.00 275.39,16.28 501.69,125.81 L500.00,48.84 L-10.15,90.28 Z" style={{stroke: 'none', fill: '#01405c'}}></path>
        <path d="M-3.38,121.88 C149.99,150.00 296.27,1.48 500.56,104.11 L500.00,0.00 L0.00,0.00 Z" style={{stroke: 'none', fill: '#017cad'}}></path>
      </svg>
      <div className="display-2" style={{position:'absolute',top:'0',left:'20px',color:'white'}}><b>SOFA</b></div>
      <div className="" style={{position:'absolute',top:'90px',left:'25px',color:'#F0F0F0'}}>Your forecasting assistant!</div>
    </div>
);

export default Header;