import { Route } from 'react-router-dom';


const isAuthenticated = () => {
  debugger
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
