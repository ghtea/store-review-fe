import React from 'react';
import styled from 'styled-components';

export type TemplateBasicProps = {
}

export const TemplateBasic:React.FunctionComponent<TemplateBasicProps> = () => {

  const Container = styled.div`
		width: 100%;
		height: calc(100vh - 60px);
		background-color: #888888;
`;

	return (
		<Container/>
	)
}