import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const color1 = "#60a9f2";

const BackBtn = styled.button`
width: 100%;
height: 40px;
border-radius: 5px;
border: 0px;
box-shadow: inset 2px 2px 3px 1px ${color1}, 2px 2px 3px 1px ${color1};
background-color: white;

&:focus , &:hover {
  background-color: ${color1};
  color: white;
}
`;


interface IBackButtonProps {
}

const BackButton: React.FunctionComponent<IBackButtonProps> = (props) => {
  const navigate = useNavigate();

  return (
    <>
      <BackBtn onClick={() => { navigate(-1); }}>
        뒤로가기
      </BackBtn>
    </>
  );
};

export default BackButton;
