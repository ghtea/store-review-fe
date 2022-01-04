import React from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';

export type MapProps = {
}

const MapDiv = styled.div`
	width: 100vw;
	height: 100vh;
`;

export const Map:React.FunctionComponent<MapProps> = () => {
	return (
		<TemplateBasic>
			<MapDiv>
				<div>
					사이드 바
				</div>
				<div>
					맵
				</div>
			</MapDiv>
		</TemplateBasic>
	)
}