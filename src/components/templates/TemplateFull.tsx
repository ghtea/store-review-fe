import React from 'react';
import styled from 'styled-components';

export type TemplateFullProps = {
}

const Container = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: #ffffff;
`;

export const TemplateFull:React.FunctionComponent<TemplateFullProps> = ({
  children
}) => {

  return (
    <Container>{children}</Container>
  )
}