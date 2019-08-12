import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import { Route, HashRouter , Switch } from "react-router-dom";
import {proxyStore} from './store';
import routers from "./router";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import {ToastContainer} from "react-toastify";
import { PrivateRoute } from './helper/privateRoute';


class App extends Component {
  render () {
    return (
      <div className="hollonApp">
       <Switch>
         {routers.map((item, index) =>  item.privateRouter ? (
             <Route key={index} path={item.path} component={item.component} exact={item.exact} />
           ) : (
             <PrivateRoute  key={index} path={item.path} component={item.component} exact={item.exact} />
           )
          )
         }
       </Switch>

      </div>
    )
  }
}


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


