import React, { useCallback, useEffect, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { placeStore } from '../../store';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';
import { ModalReviewUpsert } from '../organisms/ModalReviewUpsert';
import { SummaryReview } from '../organisms/SummaryReview';

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
	margin-top: 40px;
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
	font-size: 1.25rem;	
	width: 100%;
	padding-left: 16px;
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

const ReviewUpsertButton = styled(Button)`
	margin-top: 8px;
`

const ReviewPeopleDiv = styled.div`
	align-items: center;
`

const ReviewPeopleReviewsSummaryDiv = styled.div`
	width: 100%;
	margin-top: 16px;
	align-items: center;
`

const PeopleImageCollectionDiv = styled.div`
	flex-direction: row;
	margin-top: 16px;
	margin-bottom: 16px;
	margin-left: 16px;
	margin-right: 16px;
`

const PeopleImage = styled.img`
  width: 80px;
  height: 80px;
`

const ReviewPeopleReviewsListDiv = styled.div`
	width: 100%;
	margin-top: 16px;
	align-items: center;
`


// /store/:storeId?lat=...&lon=...&name=... => 해당 search params 이용해서 검색!
export const StorePage:React.FunctionComponent<StorePageProps> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const pageStoreState = useSelector((state: RootState) => state.place.getPageStore);

  const [isModalReviewUpsertOpen , setIsModalReviewUpsertOpen] = useState(false)
  const [hasMyReview, setHasMyReivew] = useState(false)

  useEffect(()=>{
    const name = searchParams.get("name")
    const latitude = parseFloat(searchParams.get("latitude") || "")
    const longitude = parseFloat(searchParams.get("longitude") || "")

    if (!id || !name || !latitude || !longitude) return

    dispatch(placeStore.return__GET_PAGE_STORE({
      id,
      name,
      latitude,
      longitude,
    }))
  },[dispatch, id, searchParams])

  const handleReviewUpdateButton = useCallback(()=>{
    setIsModalReviewUpsertOpen(true)
  },[])

  const handleReviewCreateButton = useCallback(()=>{
    setIsModalReviewUpsertOpen(true)
  },[])

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
                  <ReviewGroupHeading>{"내 리뷰"}</ReviewGroupHeading>
                  {true && (
                    <ReviewGroupContentDiv>
                      <Rating ratingValue={2.5} size={24}/>
                      <p>dddd 맛있었다</p>                     
                      <ReviewUpsertButton 
                        status={"primary"}
                        onClick={handleReviewUpdateButton}
                      >
                        리뷰 수정
                      </ReviewUpsertButton>
                    </ReviewGroupContentDiv>
                  )}
                  {true && (
                    <ReviewUpsertButton 
                      status={"primary"}
                      onClick={handleReviewCreateButton}
                    >
                      리뷰 작성
                    </ReviewUpsertButton>
                  )}
                </ReviewMyDiv>
                <ReviewPeopleDiv>
                  <ReviewGroupHeading>{"전체 리뷰"}</ReviewGroupHeading>
                  <ReviewGroupContentDiv>
                    <ReviewPeopleReviewsSummaryDiv>
                      <span>{"전체 평점"}</span>
                      <span>{"4.3/5"}</span>
                      <Rating ratingValue={2.5} size={32}/>
                      <PeopleImageCollectionDiv>
                        <PeopleImage/>
                        <PeopleImage/>
                        <PeopleImage/>
                      </PeopleImageCollectionDiv>
                    </ReviewPeopleReviewsSummaryDiv>
                    <ReviewPeopleReviewsListDiv>
                      {[undefined, null].map((item, index)=>(
                        <SummaryReview key={`review-${index}`}/>
                      ))}
                    </ReviewPeopleReviewsListDiv>
                  </ReviewGroupContentDiv>
                </ReviewPeopleDiv>
              </ReviewInfoDiv>
            </ContentDiv>
          )}
        </MainDiv>
      </div>
      <ModalReviewUpsert isOpen={isModalReviewUpsertOpen}/>
    </TemplateBasic>
  )
}