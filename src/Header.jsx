// Header.js
import React from 'react';
import styled from 'styled-components';
import logo from './assets/ailogo.png'; // Replace with the path to your logo image
import slogan from './assets/slogan.png'; // Replace with the path to your slogan image

const HeaderContainer = styled.header`
  background-color: #404040;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between; /* Space out children elements */
`;

const Logo = styled.img`
  max-height: 80px; /* Adjust as needed */
  width: auto;
  margin-left: 45px;
`;

const Slogan = styled.img`
  max-height: 75px; /* Adjust as needed */
  width: 50%;
  margin: 0 auto; /* Center the slogan */
`;

const SloganContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo src={logo} alt="Company Logo" />
      <SloganContainer>
        <Slogan src={slogan} alt="Company Slogan" />
      </SloganContainer>
    </HeaderContainer>
  );
}

export default Header;
