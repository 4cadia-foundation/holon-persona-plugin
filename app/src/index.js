import ReactDOM from 'react-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Welcome from './modules/Welcome/Welcome';


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

              <Route path='' component={ Welcome }></Route>

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