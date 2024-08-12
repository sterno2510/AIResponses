import './App.css';
import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './LandingPage';
import Header from './Header';
import Login from './Login';

const App = () => {
  const { isAuthenticated } = useAuth0();
  const [userObject, setUserObject] = useState(null);

  // NEED TO USE REDIRECT TO A ROUTE HERE INSTEAD OF CONDITIONAL
  // RENDERING AS THIS CAUSES THE PAGE TO BLINK
  return (
    <>
      <Header userObject={userObject} setUserObject={setUserObject} />
      {!isAuthenticated
      && <Login />}
      {isAuthenticated
      && <LandingPage userObject={userObject} />}
    </>
  );
};

export default App;
