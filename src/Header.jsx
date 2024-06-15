/* eslint-disable react/function-component-definition */
import React from 'react';
import logo from './assets/ailogo.png';
import slogan from './assets/slogan.png';
import {
  HeaderContainerStyled,
  LogoStyled,
  SloganStyled,
} from './HeaderStyledComponents';

const Header = () => (
  <HeaderContainerStyled>
    <LogoStyled src={logo} alt="Company Logo" />
    <SloganStyled src={slogan} alt="Company Slogan" />
  </HeaderContainerStyled>
);

export default Header;
