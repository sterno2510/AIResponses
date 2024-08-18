import styled from 'styled-components';

export const ContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f4f8;
  min-height: 100vh;
`;

export const TitleStyled = styled.h1`
  color: #333;
  margin-bottom: 20px;
`;

export const InputStyled = styled.textarea`
  padding: 10px;
  width: 300px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

export const ImageStyled = styled.img`
  margin-top: 20px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
