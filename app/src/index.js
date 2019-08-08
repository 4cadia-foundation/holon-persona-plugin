import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import { Route, HashRouter , Switch } from "react-router-dom";

import {Store} from 'webext-redux';

import routers from "./router";


import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import {ToastContainer} from "react-toastify";


class App extends Component {
  render () {
    return (
      <div className="hollonApp">
       <Switch>
         {routers.map((item, index)=> (<Route key={index} path={item.path} component={item.component} exact={item.exact} />))}
       </Switch>

      </div>
    )
  }
}

const proxyStore = new Store({portName: 'APP'});

proxyStore.ready().then(() => {
  render(
    <Provider store={proxyStore}>

      <HashRouter>
        <App />
      </HashRouter>

      <ToastContainer position={'top-center'} />
    </Provider>,
    document.getElementById('app')
  );
});


