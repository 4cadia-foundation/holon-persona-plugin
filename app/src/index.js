import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { Route, HashRouter , Switch } from "react-router-dom";



import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';


import routers from "./router";

import { ToastContainer } from "react-toastify";


class App extends Component {

  render () {
    return (
      <div className="hollonApp">
        <Switch>
          {routers.map((item, index)=> <Route key={index} path={item.path} component={item.component} exact={item.exact} />)}
        </Switch>
      </div>
    );
  }
}


ReactDOM.render(
  <Provider store={store}>

    <ToastContainer position={'top-center'} />

    <HashRouter>
      <App />
    </HashRouter>

  </Provider>,
  document.getElementById('app')
);
