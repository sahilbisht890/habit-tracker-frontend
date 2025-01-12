import React , {useContext} from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../createContext";
import  Home from '../components/home';

const AuthGuard = ({ children }) => {
  
    const {state , setLoginView} = useContext(AppContext);
    const isLoggedIn  = state?.isAuthenticated;

  if (!isLoggedIn) {
          setLoginView(true);
    return <Navigate to="/" replace />;
  }

 return children;
};

export default AuthGuard;
