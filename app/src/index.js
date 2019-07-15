import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";


import Navbar from "./components/Navbar/Navbar";

import ImportWallet from "./modules/ImportWallet/ImportWallet";
import Welcome from "./modules/Welcome/Welcome";

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
    );
  }
}


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)