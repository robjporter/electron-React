import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HOME from '../pages/home.js';
import SPLASH from '../pages/splash/splash.js';
import WAIT from '../pages/wait/wait.js';

class ViewManager extends Component {
  static Views() {
    return {
      home: <HOME />,
      splash: <SPLASH />,
      wait: <WAIT />
    };
  }

  static View(props) {
    let name = props.location.search.substr(1);
    let view = ViewManager.Views()[name];
    if(view == null)
      throw new Error("View '" + name + "' is undefined");
    return view;
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={ViewManager.View}/>
        </div>
      </Router>
    );
  }
}

export default ViewManager;
