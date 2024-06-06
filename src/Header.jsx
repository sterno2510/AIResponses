import React from 'react';
import styled from 'styled-components';
import logo from './assets/ailogo.png';
import slogan from './assets/slogan.png';

const HeaderContainer = styled.header`
  background-color: #404040;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.img`
  max-height: 80px;
  width: auto;
  margin-left: 45px;
`;

const Slogan = styled.img`
  max-height: 75px;
  width: 50%;
  margin: 0 auto;
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
