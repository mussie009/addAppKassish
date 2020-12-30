import {Route, Redirect} from 'react-router-dom';

const  AuthenticatedRoute = ({ component: C, appProps, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          appProps.isAuthenticated
            ? <C {...props} {...appProps} />
            : <Redirect
                to={'/'}
              />}
      />
    );
}

export default AuthenticatedRoute;