import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { placeStore } from '../../store';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';
import { Place } from '../../store/place';
import { Router, useNavigate, useSearchParams } from 'react-router-dom';
import { SagaStatus } from '../../store/type';

export type MapPageProps = {
}

const SIDE_BAR_WIDTH = 320

const MapPageDiv = styled.div`
	width: 100%;
	height: 100%;
	flex-direction: row;
`;

const SideBarWrapper = styled.div`
	height: 100%;
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

const SearchOptionWrapper = styled.div`
	margin-left: 16px;
	margin-right: 16px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;

  & label {
    margin-left: 4px;
	  color: ${props => props.theme.colors.textHint};
    font-size: 0.875rem;
  }
`

const LoadingDiv = styled.div`
	align-items: center;
	padding-top: 24px;
	padding-bottom: 24px;
`

const SearchResultDiv = styled.div`
	margin-top: 16px;
  margin-bottom: 8px;
  margin-left: 8px;
  margin-right: 8px;
	border-radius: 4px;
	background-color: #ffffff;
	overflow-y: scroll;
`

const LoadingWrapper = styled.div`
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`

const NoResultWrapper = styled.div`
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
`

const PlaceSummaryDiv = styled.div`
	flex-direction: row;
	padding: 16px;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: #d0d0d0;
	cursor: pointer;
	&:hover {
		background-color: #f8f8f8;
	}
`

const PlaceSummaryLeftDiv = styled.div`
	flex: 1;
`
const PlaceSummaryRightDiv = styled.div`
	width: 72px;
	align-items: center;
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
	z-index: 1;
`;

const OverlayButton = styled(Button)`
	border-width: 1px;
	border-style: solid;
	border-color: #d0d0d0;
`

export const MapPage:React.FunctionComponent<MapPageProps> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const searchedPlacesState = useSelector((state: RootState) => state.place.searchedPlaces);
  const mainMap = useSelector((state: RootState) => state.place.mainMap);

  const [searchValue, setSearchValue] = useState("")
  const [isCurrentLocationSearch, setIsCurrentLocationSearch] = useState(false)

  useEffect(() => {
    dispatch(placeStore.return__INIT_MAIN_MAP())
  }, [dispatch])

  useEffect(()=>{
    const isCurrentLocationSearchFromLocalStorage = localStorage.getItem("isCurrentLocationSearch");
    if (isCurrentLocationSearchFromLocalStorage){
      setIsCurrentLocationSearch(true)
    }
  },[])

  useEffect(()=>{
    const newKeyword = searchParams.get("q") || ""
    if (!mainMap) return;
    if (newKeyword){
      dispatch(placeStore.return__SEARCH_PLACES({
        keyword: newKeyword,
        isCurrentLocation: isCurrentLocationSearch
      }))
      setSearchValue(newKeyword)
    }
    else {
      dispatch(placeStore.return__RESET_SEARCH_PLACES())
      setSearchValue("")
    }
  },[dispatch, isCurrentLocationSearch, mainMap, searchParams])

  const handleSearchInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback((event)=>{
    if (event.key === "Enter"){
      dispatch(placeStore.return__SEARCH_PLACES({
        keyword: searchValue,
        isCurrentLocation: isCurrentLocationSearch
      }))
    }
  },[dispatch, isCurrentLocationSearch, searchValue])

  const handleSearchButtonClick = useCallback(()=>{
    dispatch(placeStore.return__SEARCH_PLACES({
      keyword: searchValue,
      isCurrentLocation: isCurrentLocationSearch
    }))
   
    const serachParams = new URLSearchParams();
    serachParams.set("q", searchValue)

    navigate({ search: serachParams.toString() })
  },[dispatch, isCurrentLocationSearch, navigate, searchValue])

  const handleCurrentLocationSearchCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event)=>{
    const shouldChecked = Boolean(event.currentTarget.checked)
    setIsCurrentLocationSearch(shouldChecked)
    if (shouldChecked){
      localStorage.setItem("isCurrentLocationSearch", "true");
    } else {
      localStorage.removeItem("isCurrentLocationSearch");
    }

    if (searchValue){
      dispatch(placeStore.return__SEARCH_PLACES({
        keyword: searchValue,
        isCurrentLocation: shouldChecked
      }))
    }
  },[dispatch, searchValue])

  const handleCurrentLocationButtonClick = useCallback(()=>{
    dispatch(placeStore.return__MOVE_MAP({
      isCurrent: true
    }))
  },[dispatch])

  const handlePlaceSummaryClick = useCallback((item: Place )=>{
    dispatch(placeStore.return__MOVE_MAP({
      coords: {
        latitude: item.y,
        longitude: item.x,
      }
    }))
  },[dispatch])

  const handlePlaceSummaryLinkClick = useCallback((item: Place )=>{
    const serachParams = new URLSearchParams();
    serachParams.set("name", item.place_name)
    serachParams.set("longitude", item.x.toString())
    serachParams.set("latitude", item.y.toString())

    navigate({ pathname: `/store/${item.id}`, search: serachParams.toString() })
  },[navigate])

  const displayingPlaces = useMemo(()=>{
    return (searchedPlacesState?.data || [])
  },[searchedPlacesState?.data])

  useEffect(()=>{
    const firstPlace = displayingPlaces[0];

    if (firstPlace){
      dispatch(placeStore.return__MOVE_MAP({
        coords: {
          latitude: firstPlace.y,
          longitude: firstPlace.x,
        }
      }))
    }

    dispatch(placeStore.return__ADD_MARKERS({
      items: displayingPlaces.map(item => ({
        coords: {
          latitude: item.y,
          longitude: item.x
        }
      }))
    }))
  },[dispatch, displayingPlaces])

  const isNoSearchResult = useMemo(()=>{
    return searchedPlacesState.keyword && searchedPlacesState.data?.length === 0 && (searchedPlacesState.status !== SagaStatus.LOADING)
  },[searchedPlacesState.data?.length, searchedPlacesState.keyword, searchedPlacesState.status])

  return (
    <TemplateBasic>
      <MapPageDiv>
        <SideBarWrapper>
          <SideBarDiv>
            <SearchInputButtonWrapper>
              <SearchInput 
                value={searchValue} 
                onChange={(event)=>setSearchValue(event.target.value)}
                onKeyDown={handleSearchInputKeyDown}
              ></SearchInput>
              <SearchButton 
                onClick={handleSearchButtonClick}
                status={"primary"}
                shape={"custom"}
              >
								검색
              </SearchButton>
            </SearchInputButtonWrapper>
            <SearchOptionWrapper>
              <input 
                id={"current-location-search-checkbox"} 
                type={"checkbox"} 
                checked={isCurrentLocationSearch} 
                onChange={handleCurrentLocationSearchCheckboxChange} 
                autoCapitalize="off" 
                autoCorrect="off" 
              />
              <label htmlFor={"current-location-search-checkbox"}>현재 위치 기준</label>
            </SearchOptionWrapper>
            <SearchResultDiv>
              {displayingPlaces.map((item, index)=>(
                <PlaceSummaryDiv key={`place-${index}`} onClick={()=>handlePlaceSummaryClick(item)}>
                  <PlaceSummaryLeftDiv>
                    <PlaceTitleHeading>{item.place_name}</PlaceTitleHeading>
                    <PlaceCategorySpan>{item.category_name}</PlaceCategorySpan>
                    <PlaceAddressSpan>{item.road_address_name}</PlaceAddressSpan>
                  </PlaceSummaryLeftDiv>
                  <PlaceSummaryRightDiv>
                    <div onClick={()=>handlePlaceSummaryLinkClick(item)}>go</div>
                  </PlaceSummaryRightDiv>
                </PlaceSummaryDiv>
              ))}
            </SearchResultDiv>

            {searchedPlacesState.status === SagaStatus.LOADING && (
              <LoadingWrapper> 
                <LoadingDiv>loading</LoadingDiv>
              </LoadingWrapper>
            )}
							
            {isNoSearchResult && (
              <NoResultWrapper> 
                <span> 검색된 장소가 없습니다 </span>
              </NoResultWrapper>
            )}
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