import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {proxyStore as store} from '../store';
import * as moment from 'moment';
import Settings from '../../config/authentications';

const isAuthenticated = () => {
  const { activeDate, hasWallet } = store.getState().wallet;
  const dateValid = moment(activeDate).add(Settings.expirationTimeInMinutes, 'minutes');
  return (hasWallet && moment(activeDate).isBefore(dateValid);
}


export const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest}
         render={props => isAuthenticated () ? (
           <Component {...props} />
           ):(
           <Redirect to={{pathname: '/', state: {from: props.location}}} />
    )}
  />
);
