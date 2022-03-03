import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  user:'',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  headers:'',
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('accessToken');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const [header, setHeader] = useState('');

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler = (token, expirationTime) => {
    //debugger
    setToken(token);
    localStorage.setItem('accessToken', token);
    localStorage.setItem('expirationTime', expirationTime);
    
    debugger
    axios.defaults.headers.common= {"Authorization" : `Bearer ${token}`};
    const config = {
      headers: {
          "Content-type": "application/json",
           "Authorization": `Bearer ${token}`,
      },
 };    
    setHeader(config)
    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    headers: header,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;