import styled from 'styled-components';

export const HeaderContainerStyled = styled.header`
  background-color: #404040;
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 5px solid #0068d1;
  position: relative; /* Added for positioning the logout button */
`;

export const LogoStyled = styled.img`
  max-height: 80px;
  width: auto;
  margin-right: 10px; /* Adjust margin between logo and slogan */
`;

export const SloganStyled = styled.img`
  max-height: 75px;
  width: auto;
`;

export const LogoutButtonContainerStyled = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImageStyled = styled.img`
  max-height: 60px;
  width: auto;
  border-radius: 50%;
  margin-bottom: 15px;
`;
