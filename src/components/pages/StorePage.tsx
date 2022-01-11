import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';

export type StorePageProps = {
}


const PlaceAddressSpan = styled.span`
	margin-top: 24px;
	font-size: 0.75rem;
	color: ${props => props.theme.colors.textHint};
`

// /store/:storeId?lat=...&lon=...&name=... => 해당 search params 이용해서 검색!
export const StorePage:React.FunctionComponent<StorePageProps> = () => {
	const dispatch = useDispatch();

	const { id } = useParams<"id">();
  const [searchParams, setSearchParams] = useSearchParams();

	// const searchedPlacesState = useSelector((state: RootState) => state.place.searchedPlaces);

	// const handleCurrentLocationButtonClick = useCallback(()=>{
	// 	dispatch(placeStore.return__MOVE_MAP({
	// 		isCurrent: true
	// 	}))
	// },[dispatch])

	return (
		<TemplateBasic>
			
		</TemplateBasic>
	)
}


	/* 
	
	place_name: string,
  distance: number,
  place_url: string,
  category_name: string,
  address_name: string,
  road_address_name: string,
  id: number,
  phone: string,
  category_group_code: string,
  category_group_name: string,
  x: number,
  y: number 

*/