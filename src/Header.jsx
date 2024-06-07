/* eslint-disable react/function-component-definition */
import React from 'react';
import styled from 'styled-components';
import logo from './assets/ailogo.png';
import slogan from './assets/slogan.png';

const HeaderContainerStyled = styled.header`
  background-color: #404040;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #0068d1;
`;

const LogoStyled = styled.img`
  max-height: 80px;
  width: auto;
  margin-right: 10px; /* Adjust margin between logo and slogan */
`;

const SloganStyled = styled.img`
  max-height: 75px;
  width: auto;
`;

const Header = () => (
  <HeaderContainerStyled>
    <LogoStyled src={logo} alt="Company Logo" />
    <SloganStyled src={slogan} alt="Company Slogan" />
  </HeaderContainerStyled>
);

export default Header;
