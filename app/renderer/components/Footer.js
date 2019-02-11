import React from 'react';
import { APPLICATION_VERSION } from '../../common/constants';

const Footer = () => (
    <div style={{height: '100px', backgroundColor: '#017cad'}}>
        <div style={{backgroundColor:'#01405c',height:'3px'}}></div>
        <div className="h3" style={{position:'absolute',left:'20px',bottom:'25px',color:'#F0F0F0'}}><b>S</b>alesforce <b>O</b>pportunity <b>F</b>iltering <b>A</b>pplication</div> 
        <div className="float-right pt-3" style={{fontSize:'0.8em',fontColor:'#01405c'}}>
            <b>App Version:</b> {APPLICATION_VERSION}<br/>
            <b>React Version:</b> {React.version}<br/>
            <b>Electron Version:</b> {process.versions.electron}<br/>
        </div>
    </div>
);

export default Footer;