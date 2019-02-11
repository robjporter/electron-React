import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { APPLICATION_VERSION } from '../../../common/constants';

class Splash extends React.Component {
  render () {
    return (
        <div className="App mt-0 mb-0">
          <div style={{height:'150px', overflow: 'hidden', backgroundColor: '#017cad'}}>
            <div className="display-1 text-white" style={{}}>SOFA</div>
          </div>
          <div style={{height: '150px', overflow: 'hidden'}}>
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{height: '100%', width: '100%'}}>
              <path d="M-5.64,133.70 C149.99,150.00 275.39,16.28 501.69,125.81 L500.00,48.84 L-10.15,90.28 Z" style={{stroke: 'none', fill: '#01405c'}}></path>
              <path d="M-3.38,121.88 C149.99,150.00 296.27,1.48 500.56,104.11 L500.00,0.00 L0.00,0.00 Z" style={{stroke: 'none', fill: '#017cad'}}></path>
            </svg>
          </div>
          <div className="h5 float-right" style={{}}>
            <b>App Version:</b> {APPLICATION_VERSION}<br/>
            <b>React Version:</b> {React.version}<br/>
            <b>Electron Version:</b> {process.versions.electron}<br/>
          </div>
        </div>
    );
  }
};

export default Splash;
