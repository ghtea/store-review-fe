import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { placeStore } from '../../store';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';

export type StorePageProps = {
}


const MainDiv = styled.div`
	width: 100%;
	max-width: ${props => props.theme.media.lg}px;
	align-items: center;
	align-self: center;
`

const ContentDiv = styled.div`
	width: 100%;
	margin-top: 16px;
	margin-bottom: 16px;
	padding-top: 64px;
	padding-bottom: 64px;
	padding-left: 16px;
	padding-right: 16px;
	background-color: #ffffff;
	border-radius: 4px;
	border-width: 1px;
	border-style: solid;
	border-color: #d8d8d8;
`

const StoreInfoDiv = styled.div`
	align-items: center;
`


const StoreNameSpan = styled.span`
	font-size: 1.625rem;
	font-weight: 700;
`


const StoreDetailTableDiv = styled.div`
	margin-top: 24px;
`

const StoreDetailTableItemDiv = styled.div`
	flex-direction: row;
	&:nth-child(n+2){
		margin-top: 8px;
	}
`

const StoreDetailTableKeyDiv = styled.div`
	width: 100px;
	align-items: flex-end;
	color: ${props => props.theme.colors.textHint};
`

const StoreDetailTableValueDiv = styled.div`
	margin-left: 16px;
`

const ReviewInfoDiv = styled.div`
	border-top-style: solid;
	border-width: 1px;
	border-color: #d8d8d8;
	margin-top: 32px;
`

const ReviewGroupHeading = styled.h3`
	font-size: 1.125rem;	
	width: 100%;
`

const ReviewMyDiv = styled.div`
	margin-top: 16px;
	align-items: center;
`

const ReviewGroupContentDiv = styled.div`
	width: 100%;
	max-width: 640px;
	align-items: center;
`

const ReviewTextarea = styled.textarea`
	width: 100%;
	margin-top: 8px;
	margin-left: 8px;
	margin-right: 8px;
	border-color: #d0d0d0;
	border-width: 1px;
	border-radius: 4px;
`

const ReviewBottomDiv = styled.div`
	flex-direction: row;
	width: 100%;
	justify-content: flex-end;
`

const ReviewSubmitButton = styled(Button)`
	margin-top: 8px;
`

const ReviewPeopleDiv = styled.div`
	align-items: center;
`

const ReviewPeopleReviewsDiv = styled.div`
	width: 100%;
	margin-top: 16px;
	align-items: center;
`

const ReviewSummaryDiv = styled.div`
	width: 100%;
	max-width: 640px;
	padding: 8px;
	flex-direction: row;

	&:nth-child(n+2){
		border-width: 1px;
		border-top-style: solid;
		border-color: #d0d0d0;
	}
`

const ReviewSummaryLeftDiv = styled.div`
	align-items: center;
	width: 120px;
`

const ReviewSummaryRightDiv = styled.div`
	flex: 1;
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

	// const storeDetailInfoItems = useMemo(()=>{
	// 	return ([
	// 		{key: "전화번호", value: pageStoreState.data?.phone},
	// 		{key: "주소", value: pageStoreState.data?.road_address_name || pageStoreState.data?.address_name},
	// 	])
	// },[])

	return (
		<TemplateBasic backgroundColor={"#f8f8f8"}>
			<div>
				<MainDiv>
					{!pageStoreState.data && pageStoreState.status.loading && (
						<div>loading</div>
					)}
					{pageStoreState.data && (
						<ContentDiv>
							<StoreInfoDiv>
								<StoreNameSpan>
									{pageStoreState.data.place_name}
								</StoreNameSpan>
								<StoreDetailTableDiv>
									<StoreDetailTableItemDiv>
										<StoreDetailTableKeyDiv> {"주소"} </StoreDetailTableKeyDiv>
										<StoreDetailTableValueDiv> {pageStoreState.data.road_address_name || pageStoreState.data.address_name} </StoreDetailTableValueDiv>
									</StoreDetailTableItemDiv>
									<StoreDetailTableItemDiv>
										<StoreDetailTableKeyDiv> {"전화번호"} </StoreDetailTableKeyDiv>
										<StoreDetailTableValueDiv> {pageStoreState.data.phone} </StoreDetailTableValueDiv>
									</StoreDetailTableItemDiv>
								</StoreDetailTableDiv>
							</StoreInfoDiv>
							<ReviewInfoDiv>
								<ReviewMyDiv>
									<ReviewGroupHeading>{"리뷰 작성"}</ReviewGroupHeading>
									<ReviewGroupContentDiv>
										<div>*****</div>
										<ReviewTextarea onChange={(event)=>{}}/>
										<ReviewBottomDiv>
											<ReviewSubmitButton status={"primary"}>등록</ReviewSubmitButton>
										</ReviewBottomDiv>
									</ReviewGroupContentDiv>
									
								</ReviewMyDiv>
								<ReviewPeopleDiv>
									<ReviewGroupHeading>{"전체 리뷰"}</ReviewGroupHeading>
									<ReviewGroupContentDiv>
										<ReviewPeopleReviewsDiv>
											{[undefined, null].map((item, index)=>(
												<ReviewSummaryDiv key={`review-${index}`}>
													<ReviewSummaryLeftDiv>
														<span>잡스</span>
													</ReviewSummaryLeftDiv>
													<ReviewSummaryRightDiv>
														<span> *** </span>
														<p>맛 없습니다</p>
													</ReviewSummaryRightDiv>
												</ReviewSummaryDiv>
										))}
										</ReviewPeopleReviewsDiv>
									</ReviewGroupContentDiv>
								</ReviewPeopleDiv>
							</ReviewInfoDiv>
						</ContentDiv>
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