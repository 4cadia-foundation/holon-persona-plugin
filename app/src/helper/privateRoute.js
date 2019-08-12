import React from 'react';
import { Route, Redirect } from 'react-router-dom';


const isAuthenticated = () => {
  return false;
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
