// Login.js
import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useAuth0 } from '@auth0/auth0-react';

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: '#f0f0f0',
  fontFamily: 'Arial, sans-serif',
});

const Header = styled('h1')({
  fontSize: '3rem',
  color: '#404040',
  marginBottom: '0.5rem',
});

const Motto = styled('p')({
  fontSize: '1.25rem',
  color: '#404040',
  marginBottom: '2rem',
});

const StyledButton = styled(Button)({
  fontSize: '1rem',
  padding: '0.5rem 2rem',
  borderRadius: '50px',
  border: '2px solid #404040',
  color: '#404040',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#404040',
    color: '#fff',
  },
});

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const authenticate = () => {
    loginWithRedirect();
  };

  return (
    <Container>
      <Header>AI Companion</Header>
      <Motto>Your personal AI assistant for every task</Motto>
      <StyledButton onClick={authenticate} variant="outlined">
        Login
      </StyledButton>
    </Container>
  );
};

export default Login;
