import {Redirect, Route} from 'react-router-dom';
import {useContext} from 'react';
import AuthContext from '../context/AuthContext.jsx';

export default function PrivateRoute({children, ...rest}) {
  let {user} = useContext(AuthContext);
  return <Route {...rest}>{(!user) ? <Redirect to="/signin"/> : children}</Route>;
}


// ts code for private route
// import { Route, Redirect } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../path/to/AuthContext'; // Replace with the correct path to your AuthContext file

// const PrivateRoute = ({ children, ...rest }: any) => {
//   const { user } = useContext(AuthContext);
//   return <Route {...rest}>{!user ? <Redirect to="/login" /> : children}</Route>;
// };