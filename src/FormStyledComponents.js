import styled from 'styled-components';

export const ContainerStyled = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const TitleStyled = styled.h2`
  text-align: center;
`;

export const ResumeFormStyled = styled.form`
  display: flex;
  flex-direction: column;
`;

export const CoverLetterFormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
`;

export const CoverLetterFormGroupStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

export const ButtonStyled = styled.button`
  width: fit-content;
  padding: 10px 20px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  background-color: #404040;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #7F7F7F;
  }
`;

export const NavButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
`;

export const LeftButton = styled(ButtonStyled)`
  position: absolute;
  left: 0;
`;

export const RightButton = styled(ButtonStyled)`
  position: absolute;
  right: 0;
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
  margin-top: 75px;
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

export const TextAreaStyled = styled.textarea`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 500px;
`;

export const LabelStyled = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
  display: flex;
  justify-content: center;
`;
