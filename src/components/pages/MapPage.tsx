import React from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';

export type MapPageProps = {
}

const MapPageDiv = styled.div`
	width: 100vw;
	height: 100vh;
`;

export const MapPage:React.FunctionComponent<MapPageProps> = () => {
	return (
		<TemplateBasic>
			<MapPageDiv>
				<div>
					사이드 바
				</div>
				<div>
					맵
				</div>
			</MapPageDiv>
		</TemplateBasic>
	)
}