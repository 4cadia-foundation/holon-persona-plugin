import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import WelcomeBack from './modules/WelcomeBack/WelcomeBack';

import Welcome from './modules/Welcome/Welcome';
import ImportWallet from './modules/ImportWallet/ImportWallet';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';


class App extends Component {

  constructor(props){
    super(props);
  }


  render() {
   return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path='' component={ WelcomeBack }></Route>
              <Route path='/importwallet' component={ ImportWallet }></Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    )
  }
}


ReactDOM.render(
    <App />,
  document.getElementById('app')
)