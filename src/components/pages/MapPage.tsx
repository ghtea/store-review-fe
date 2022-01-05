import React from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';

export type MapPageProps = {
}

const MapPageDiv = styled.div`
	width: 100%;
	height: 100%;
`;

const SideBarWrapper = styled.div`
	
`;

const SideBarDiv = styled.div`
	
`;

const MapWrapper = styled.div`
	
`;

const MapDiv = styled.div`
	
`;

export const MapPage:React.FunctionComponent<MapPageProps> = () => {
	return (
		<TemplateBasic>
			<MapPageDiv>
				<SideBarWrapper>
					<SideBarDiv>
						사이드 바
					</SideBarDiv>
				</SideBarWrapper>

				<MapWrapper>
					<MapDiv>
						맵
					</MapDiv>
				</MapWrapper>
			</MapPageDiv>
		</TemplateBasic>
	)
}