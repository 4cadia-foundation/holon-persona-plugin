import { render } from 'react-dom';
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import { Route, HashRouter , Switch } from "react-router-dom";
import {proxyStore} from './store';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';
import {ToastContainer} from "react-toastify";
import { PrivateRoute } from './helper/privateRoute';
import Welcome  from './modules/Welcome/Welcome';
import ImportWallet from './modules/ImportWallet/ImportWallet';

class App extends Component {
  render () {
    return (
      <div className="hollonApp">
       <Switch>
         <Route exact path='/' component={Welcome} />
         <PrivateRoute exact path='/importwallet' component={ImportWallet} />
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


