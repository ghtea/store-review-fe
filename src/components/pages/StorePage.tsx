import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { placeStore } from '../../store';
import { RootState } from '../../store/reducers';

export type StorePageProps = {
}


const MainDiv = styled.div`
	width: 100%;
	max-width: ${props => props.theme.media.lg}px;
	align-items: center;
`

// /store/:storeId?lat=...&lon=...&name=... => 해당 search params 이용해서 검색!
export const StorePage:React.FunctionComponent<StorePageProps> = () => {
	const dispatch = useDispatch();

	const { id } = useParams<"id">();
  const [searchParams, setSearchParams] = useSearchParams();

	const pageStoreState = useSelector((state: RootState) => state.place.getPageStore);

	// const handleCurrentLocationButtonClick = useCallback(()=>{
	// 	dispatch(placeStore.return__MOVE_MAP({
	// 		isCurrent: true
	// 	}))
	// },[dispatch])

	useEffect(()=>{
		const name = searchParams.get("name")
		const latitude = parseFloat(searchParams.get("latitude") || "")
		const longitude = parseFloat(searchParams.get("longitude") || "")

		console.log(id, name, latitude, longitude)
		if (!id || !name || !latitude || !longitude) return

		dispatch(placeStore.return__GET_PAGE_STORE({
			id,
			name,
			latitude,
			longitude,
		}))
	},[dispatch, id, searchParams])

	return (
		<TemplateBasic>
			<div>
				<MainDiv>
					{!pageStoreState.data && pageStoreState.status.loading && (
						<div>loading</div>
					)}
					{pageStoreState.data && (
						<div>{pageStoreState.data.place_name}</div>
					)}
				</MainDiv>
			</div>
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