import React from 'react';
import styled from 'styled-components';

export type TemplateFullProps = {
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
	background-color: #ffffff;
	overflow: auto;
`;

export const TemplateFull:React.FunctionComponent<TemplateFullProps> = ({
  children
}) => {

  return (
    <Container>{children}</Container>
  )
}