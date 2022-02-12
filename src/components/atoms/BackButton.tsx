import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type BackButtonProps = {
}

const StyledButton = styled.button`
  display: flex;
  width: 40px;
  background-color: transparent;
  flex-grow: 0;
`

const BackButton: React.FunctionComponent<BackButtonProps> = (props) => {
  const navigate = useNavigate();

  return (
    <StyledButton onClick={() => { navigate(-1); }}>
      이전
    </StyledButton>
  );
};

export default BackButton;
