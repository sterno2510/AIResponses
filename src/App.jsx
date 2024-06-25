import './App.css';
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from './LandingPage';
import Header from './Header';
import Login from './Login';

const App = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log('user', user, 'is authenticated', isAuthenticated, 'loading', isLoading);
  return (
    <>
      <Header />
      {!isAuthenticated
      && <Login />}
      {isAuthenticated
      && <LandingPage />}
    </>
  );
};

export default App;
