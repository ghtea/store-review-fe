import React from 'react';
import styled from 'styled-components';

export type TemplateBasicProps = {
}

const Container = styled.div`
	width: 100%;
	height: calc(100vh - 60px);
	background-color: #888888;
`;

export const TemplateBasic:React.FunctionComponent<TemplateBasicProps> = ({
	children
}) => {

	return (
		<Container>{children}</Container>
	)
}