import {Route, Redirect} from 'react-router-dom';

const  UnauthenticatedRoute = ({ component: C, appProps, ...rest }) => {
  return (
    <Route
        {...rest}
        render={props =>
        !appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Redirect to="/estimer" />}
    />
  )
}
export default UnauthenticatedRoute;