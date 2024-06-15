import styled from 'styled-components';

export const ContainerStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const TitleStyled = styled.h2`
  text-align: center;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ButtonStyled = styled.button`
  width: fit-content;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #0068d1;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #404040;
  }
`;

export const SectionStyled = styled.section`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

export const SectionTitleStyled = styled.h3`
  margin-top: 0;
`;

export const DangerousHtmlStyled = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SpinnerStyled = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #333;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ButtonContentStyled = styled.div`
  display: flex;
  align-items: center;
`;
