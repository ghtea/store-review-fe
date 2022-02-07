import React from 'react';
import styled from 'styled-components';

export type LoadingProps = {
  
}

const StyledDiv = styled.div<LoadingProps>`
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;
`

export const Loading:React.FunctionComponent<LoadingProps> = ({
  
}) => {

  return (
    <StyledDiv>로딩중...</StyledDiv>
  )
}