import { Redirect, Route } from 'react-router-dom';
import useAuthContext from 'services/useAuthContext'
import Main from './Main'

//const {user}=useAuthContext()

// const PrivateRoute=withPrivateRoute(()=>{const user=useAuthContext();return user})(Main)

// export default PrivateRoute;

export default function PrivateRoute({ component: Com, ...rest }) {
    const {user}=useAuthContext();
    return (
      <Route
        {...rest}
        render={props =>
          user
            ? <Com {...props} />
            : <Redirect
                to={`signin`}
              />}
      />
    );
  }