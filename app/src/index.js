import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React from 'react';
import { Route, HashRouter, Switch } from 'react-router-dom';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import routers from './router';

import './styles/main.css';

export default () => (
  <div className="hollonApp">
    <Switch>
      {routers.map((item, index) => (
        <Route key={index}
          path={item.path}
          component={item.component}
          exact={item.exact}
        />
      ))}
    </Switch>
  </div>
);

ReactDOM.render(
  <Provider store={store}>

    <ToastContainer position={'top-center'} />

    <HashRouter>
      <App />
    </HashRouter>

  </Provider>,
  document.getElementById('app'),
);
