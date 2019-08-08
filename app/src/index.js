import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter , Switch } from "react-router-dom";
import {ToastContainer} from "react-toastify";
import { Provider } from 'react-redux';
import store from './redux/store';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import routers from "./router";
import Loader from '../src/components/Loader/Loader';

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

ReactDOM.render(
  <Provider store={store}>

    <ToastContainer position={'top-center'} />
    <Loader/>

    <HashRouter>
      <App />
    </HashRouter>

  </Provider>,
  document.getElementById('app')
)
