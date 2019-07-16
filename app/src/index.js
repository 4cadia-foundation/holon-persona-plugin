import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import { Route, Link, HashRouter , Switch } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';

import Welcome from './modules/Welcome/Welcome';
import ImportWallet from './modules/ImportWallet/ImportWallet';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';


class App extends Component {

  render (){
    return (
      <div className="hollonApp">

       <Navbar />

       <Switch>
          <Route path="/" exact={true} component={ Welcome } />
          <Route path="/importwallet" component={ ImportWallet } />
       </Switch>
      </div>
    )
  }
}


ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('app')
)
