import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import { Provider } from 'react-redux'

import Home from './modules/Home/Home';
import Card from './modules/importarecriar/card.js'
import store from './redux/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/main.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Card />
        </Provider>

      </div>
    )
  }
}


ReactDOM.render(
    <App />,
  document.getElementById('app')
)