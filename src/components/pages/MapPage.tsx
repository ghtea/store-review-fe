import React, { useCallback, useEffect, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { naverStore } from '../../store';
import { RootState } from '../../store/reducers';

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

const SearchInputButtonWrapper = styled.div`
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
	width: 100%;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 16px;
	padding-bottom: 16px;
`;

const SearchInput = styled.input`
	font-size: 1.125rem;
	height: 40px;
	flex: 1;
`;

const SearchButton = styled.button`
	font-size: 1.125rem;
	border-radius: 0;
	box-shadow: none;
	padding: 0;
	border: none;
	background-color: transparent;
	padding-left: 16px;
	padding-right: 16px;
	flex-shrink: 0;
`;

const SearchResultDiv = styled.div`
	padding: 16px;
`

const PlaceSummaryDiv = styled.div`
	padding: 16px;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: gray;
`

const PlaceTitleHeading = styled.h3`
	font-size: 1.125rem;
`

const PlaceCategorySpan = styled.span`
	margin-top: 8px;
`

const PlaceAddressSpan = styled.span`
	margin-top: 16px;
	font-size: 0.875rem;
`

const MapWrapper = styled.div`
	width: calc(100% - ${SIDE_BAR_WIDTH}px);
	height: 100%;
`;

const MapDiv = styled.div`
	width: 100%;
	height: 100%;
`;

export const MapPage:React.FunctionComponent<MapPageProps> = () => {
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState("")

	const searchedPlacesState = useSelector((state: RootState) => state.naver.searchedPlaces);

	// useEffect(()=>{
	// 	console.log("searchedPlacesData: ", searchedPlacesData); // TODO: remove 
	// },[searchedPlacesData])
	useEffect(() => {
		if (!naver) return;

		const mapOption = {
			center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 10
		}
		const map = new naver.maps.Map("mainMap", mapOption);
	}, [])

	const handleSearchButtonClick = useCallback(()=>{
		dispatch(naverStore.return__SEARCH_PLACES({
			keyword: searchValue
		}))
	},[dispatch, searchValue])

	return (
		<TemplateBasic>
			<MapPageDiv>
				<SideBarWrapper>
					<SideBarDiv>
						<SearchInputButtonWrapper>
							<SearchInput value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}></SearchInput>
							<SearchButton onClick={handleSearchButtonClick}>검색</SearchButton>
						</SearchInputButtonWrapper>
						<SearchResultDiv>
							{searchedPlacesState?.data?.items.map((item, index)=>(
								<PlaceSummaryDiv key={`place-${index}`}>
									<PlaceTitleHeading>{item.title}</PlaceTitleHeading>
									<PlaceCategorySpan>{item.category}</PlaceCategorySpan>
									<PlaceAddressSpan>{item.roadAddress}</PlaceAddressSpan>
								</PlaceSummaryDiv>
							))}
						</SearchResultDiv>
					</SideBarDiv>
				</SideBarWrapper>

				<MapWrapper>
					<MapDiv id={"mainMap"}/>
				</MapWrapper>
			</MapPageDiv>
		</TemplateBasic>
	)
}