import React, { useCallback, useEffect, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { placeStore } from '../../store';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';
import { SearchPlacesResponseData } from '../../store/place/sagas/searchPlaces';

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
	height: 100%;
	background-color: #f0f0f0;
`;

const SearchInputButtonWrapper = styled.div`
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
	width: 100%;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 16px;
	padding-bottom: 8px;
`;

const SearchInput = styled.input`
	font-size: 1.125rem;
	height: 40px;
	flex: 1;
	padding-left: 8px;
	padding-right: 8px;
	border-bottom-left-radius: 4px;
	border-top-left-radius: 4px;
`;


const SearchButton = styled(Button)`
	padding-top: 0;
	padding-bottom: 0;
	border-bottom-right-radius: 4px;
	border-top-right-radius: 4px;
`;

const LoadingDiv = styled.div`
	align-items: center;
	padding-top: 24px;
	padding-bottom: 24px;
`

const SearchResultDiv = styled.div`
	margin: 8px;
	border-radius: 4px;
	background-color: #ffffff;
`

const PlaceSummaryDiv = styled.div`
	padding: 16px;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: #d0d0d0;
	cursor: pointer;
	&:hover {
		background-color: #f8f8f8;
	}
`

const PlaceTitleHeading = styled.h3`
	font-size: 1.125rem;
`

const PlaceCategorySpan = styled.span`
font-size: 0.875rem;
	margin-top: 8px;
	color: ${props => props.theme.colors.textHint};
`

const PlaceAddressSpan = styled.span`
	margin-top: 24px;
	font-size: 0.75rem;
	color: ${props => props.theme.colors.textHint};
`

const MapWrapper = styled.div`
	position: relative;
	width: calc(100% - ${SIDE_BAR_WIDTH}px);
	height: 100%;
`;

const MapDiv = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	&:focus {
		outline: none;
	}
`;

const MapOverlayTopDiv = styled.div`
	top: 0;
	right: 0;
	position: absolute;
	padding-top: 16px;
	padding-left: 16px;
	padding-right: 16px;
`;

const OverlayButton = styled(Button)`
	border-width: 1px;
	border-style: solid;
	border-color: #d0d0d0;
`

export const MapPage:React.FunctionComponent<MapPageProps> = () => {
	const dispatch = useDispatch();

	const [searchValue, setSearchValue] = useState("")

	const searchedPlacesState = useSelector((state: RootState) => state.place.searchedPlaces);

	useEffect(() => {
		dispatch(placeStore.return__INIT_MAIN_MAP())
	}, [dispatch])

	const handleSearchButtonClick = useCallback(()=>{
		dispatch(placeStore.return__SEARCH_PLACES({
			keyword: searchValue
		}))
	},[dispatch, searchValue])

	const handleCurrentLocationButtonClick = useCallback(()=>{
		dispatch(placeStore.return__MOVE_MAP({
			isCurrent: true
		}))
	},[dispatch])

	const handlePlaceSummaryClick = useCallback((item: SearchPlacesResponseData["data"]["items"][number] )=>{
		dispatch(placeStore.return__MOVE_MAP({
			point: {
				x: parseInt(item.mapx),
				y: parseInt(item.mapx),
			}
		}))
	},[dispatch])

	return (
		<TemplateBasic>
			<MapPageDiv>
				<SideBarWrapper>
					<SideBarDiv>
						<SearchInputButtonWrapper>
							<SearchInput value={searchValue} onChange={(event)=>setSearchValue(event.target.value)}></SearchInput>
							<SearchButton 
								onClick={handleSearchButtonClick}
								status={"primary"}
								shape={"custom"}
								>
								검색
							</SearchButton>
						</SearchInputButtonWrapper>
						<SearchResultDiv>
							{searchedPlacesState?.data?.items.map((item, index)=>(
								<PlaceSummaryDiv key={`place-${index}`} onClick={()=>handlePlaceSummaryClick(item)}>
									<PlaceTitleHeading>{item.title}</PlaceTitleHeading>
									<PlaceCategorySpan>{item.category}</PlaceCategorySpan>
									<PlaceAddressSpan>{item.roadAddress}</PlaceAddressSpan>
								</PlaceSummaryDiv>
							))}
							{searchedPlacesState.status.loading && (
								<LoadingDiv>loading</LoadingDiv>
							)}
						</SearchResultDiv>
					</SideBarDiv>
				</SideBarWrapper>

				<MapWrapper>
					<MapDiv id={"mainMap"}/>
					<MapOverlayTopDiv>
						<OverlayButton onClick={handleCurrentLocationButtonClick}>
							현재 위치
						</OverlayButton>
					</MapOverlayTopDiv>
				</MapWrapper>
			</MapPageDiv>
		</TemplateBasic>
	)
}