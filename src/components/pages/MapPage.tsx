import React, { useEffect } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';

export type MapPageProps = {
}

const SIDE_BAR_WIDTH = 320

const MapPageDiv = styled.div`
	width: 100%;
	height: 100%;
	flex-direction: row;
`;

const SideBarWrapper = styled.div`
	
`;

const SideBarDiv = styled.div`
	width: ${SIDE_BAR_WIDTH}px;
`;

const MapWrapper = styled.div`
	width: calc(100% - ${SIDE_BAR_WIDTH}px);
	height: 100%;
`;

const MapDiv = styled.div`
	width: 100%;
	height: 100%;
`;

export const MapPage:React.FunctionComponent<MapPageProps> = () => {
	
	useEffect(() => {
		if (!naver) return;

		const mapOption = {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 10
		}
		const map = new naver.maps.Map("mainMap", mapOption);
	}, [])

	return (
		<TemplateBasic>
			<MapPageDiv>
				<SideBarWrapper>
					<SideBarDiv>
						사이드 바
					</SideBarDiv>
				</SideBarWrapper>

				<MapWrapper>
					<MapDiv id={"mainMap"}/>
				</MapWrapper>
			</MapPageDiv>
		</TemplateBasic>
	)
}