/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const authenticate = () => {
    loginWithRedirect();
  };

  return (
    <div>
      <Button onClick={() => authenticate()} variant="outlined" href="#outlined-buttons">
        Link
      </Button>
    </div>
  );
};

export default Login;
