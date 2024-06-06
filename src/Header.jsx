import React from 'react';
import styled from 'styled-components';
import logo from './assets/ailogo.png';
import slogan from './assets/slogan.png';

const HeaderContainer = styled.header`
  background-color: #404040;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #0068d1;
`;

const Logo = styled.img`
  max-height: 80px;
  width: auto;
  margin-right: 10px; /* Adjust margin between logo and slogan */
`;

const Slogan = styled.img`
  max-height: 75px;
  width: auto;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Company Logo" />
      <Slogan src={slogan} alt="Company Slogan" />
    </HeaderContainer>
  );
}

export default Header;
