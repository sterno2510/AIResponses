/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Button from '@mui/material/Button';
import logo from './assets/ailogo.png';
import slogan from './assets/slogan.png';
import {
  HeaderContainerStyled,
  LogoStyled,
  SloganStyled,
  LogoutButtonContainerStyled,
  ProfileImageStyled,
  VisitCounterStyled,
} from './HeaderStyledComponents';

const Header = () => {
  const { logout, isAuthenticated, user } = useAuth0();
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    if (user) {
      axios.get(`/update?name=${user.name}&email=${user.email}`)
        .then((response) => (
          setVisitCount(response.data)
        ))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthenticated]);

  const logOut = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <HeaderContainerStyled>
      <LogoStyled src={logo} alt="Company Logo" />
      <SloganStyled src={slogan} alt="Company Slogan" />
      {isAuthenticated && (
        <LogoutButtonContainerStyled>
          {user?.picture && (
            <>
              <ProfileImageStyled src={user.picture} alt="Profile" />
              <VisitCounterStyled>
                Total Visits:
                {' '}
                {visitCount}
              </VisitCounterStyled>
            </>
          )}
          <Button onClick={logOut} variant="outlined" href="#outlined-buttons">
            Log Out
          </Button>
        </LogoutButtonContainerStyled>
      )}
    </HeaderContainerStyled>
  );
};

export default Header;
