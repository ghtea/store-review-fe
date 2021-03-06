import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useSearchParams } from 'react-router-dom';
import { placeStore, reactionStore } from '../../store';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';
import { ModalReviewUpsert } from '../organisms/ModalReviewUpsert';
import { SummaryReview } from '../organisms/SummaryReview';
import { Review } from '../../store/reaction';
import { ModalReviewRead } from '../organisms/ModalReviewRead';
import { Loading } from '../atoms/Loading';
import { SagaStatus } from '../../store/type';
import { decryptAes } from '../../utils/crypto';

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
  font-weight: 700;
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
  margin-top: 40px;
	align-items: center;
`

const ReviewPeopleReviewsSummaryDiv = styled.div`
	width: 100%;
	margin-top: 16px;
	align-items: center;
`

const ReviewPeopleReviewsListDiv = styled.div`
	width: 100%;
	margin-top: 16px;
	align-items: center;
`

export const StorePage:React.FunctionComponent<StorePageProps> = () => {
  const dispatch = useDispatch();
  const { id } = useParams<"id">();
  const [searchParams] = useSearchParams();
  const pageStoreState = useSelector((state: RootState) => state.place.getPageStore);
  const getReviewsState = useSelector((state: RootState) => state.reaction.getReviews);
  const authStore = useSelector((state: RootState) => state.auth);
  const [readingReviewData, setReadingReviewData] = useState<Review | undefined>(undefined)

  const [isModalReviewUpsertOpen , setIsModalReviewUpsertOpen] = useState(false)
  const [isModalReviewReadOpen , setIsModalReviewReadOpen] = useState(false)

  const placeId = useMemo(()=>id ? id : "", [id])

  useEffect(()=> {
    const name = searchParams.get("name")
    const latitude = parseFloat(searchParams.get("latitude") || "")
    const longitude = parseFloat(searchParams.get("longitude") || "")

    if (!placeId || !name || !latitude || !longitude) return

    dispatch(placeStore.return__GET_PAGE_STORE({
      id: placeId,
      name,
      latitude,
      longitude,
    }))
  },[dispatch, placeId, searchParams])

  const getReviews = useCallback((id: string)=>{
    dispatch(reactionStore.return__GET_REVIEWS({
      placeId: id,
    }))
  },[dispatch])

  useEffect(()=>{
    if (!placeId ) return

    getReviews(placeId)
  },[getReviews, placeId])

  // reset review
  useEffect(()=>{
    return () => {
      dispatch(reactionStore.return__RESET_GET_REVIEWS());
    }
  },[dispatch])

  const handleReviewUpdateButton = useCallback(()=>{
    setIsModalReviewUpsertOpen(true)
  },[])

  const handleReviewCreateButton = useCallback(()=>{
    setIsModalReviewUpsertOpen(true)
  },[])

  const hanldeSummaryReviewClick = useCallback((reviewData)=>{
    setIsModalReviewReadOpen(true)
    setReadingReviewData(reviewData)
  },[])

  const onClickConfirmModalReviewRead = useCallback(()=>{
    setIsModalReviewUpsertOpen(true)
    setIsModalReviewReadOpen(false)
  },[])

  const avgStars = useMemo (()=>{
    if (getReviewsState.data?.data?.placeAvgStar) {
      return Math.round(getReviewsState.data.data.placeAvgStar * 10)/10
    } else {
      return undefined
    }
  },[getReviewsState.data])

  const myReview = useMemo(()=>{
    const mySaid = authStore.data?.said
    if (!mySaid) return undefined 
    const newMyReview = (getReviewsState.data?.data?.reviewsResponseDtoList || []).find(item => decryptAes(item.said) === mySaid)
    return newMyReview ? newMyReview : undefined
  },[authStore.data?.said, getReviewsState.data?.data?.reviewsResponseDtoList])



  return (
    <TemplateBasic backgroundColor={"#f8f8f8"}>
      <div>
        <MainDiv>
          {!pageStoreState.data && pageStoreState.status === SagaStatus.LOADING && (
            <Loading/>
          )}
          {pageStoreState.data && (
            <ContentDiv>
              <StoreInfoDiv>
                <StoreNameSpan>
                  {pageStoreState.data.place_name}
                </StoreNameSpan>
                <StoreDetailTableDiv>
                  <StoreDetailTableItemDiv>
                    <StoreDetailTableKeyDiv> {"??????"} </StoreDetailTableKeyDiv>
                    <StoreDetailTableValueDiv> {pageStoreState.data.road_address_name || pageStoreState.data.address_name} </StoreDetailTableValueDiv>
                  </StoreDetailTableItemDiv>
                  <StoreDetailTableItemDiv>
                    <StoreDetailTableKeyDiv> {"????????????"} </StoreDetailTableKeyDiv>
                    <StoreDetailTableValueDiv> {pageStoreState.data.phone} </StoreDetailTableValueDiv>
                  </StoreDetailTableItemDiv>
                </StoreDetailTableDiv>
              </StoreInfoDiv>
              <ReviewInfoDiv>
                <ReviewMyDiv>
                  <ReviewGroupHeading>{"??? ??????"}</ReviewGroupHeading>
                  {myReview && (
                    <ReviewGroupContentDiv>
                      <Rating ratingValue={myReview.stars} size={24} readonly/>
                      <ReviewUpsertButton 
                        status={"primary"}
                        onClick={handleReviewUpdateButton}
                        disabled={!authStore.authenticated}
                      >
                        ?????? ??????
                      </ReviewUpsertButton>
                    </ReviewGroupContentDiv>
                  )}
                  {!myReview && (
                    <ReviewUpsertButton 
                      status={"primary"}
                      onClick={handleReviewCreateButton}
                      disabled={!authStore.authenticated}
                    >
                      ?????? ??????
                    </ReviewUpsertButton>
                  )}
                </ReviewMyDiv>
                <ReviewPeopleDiv>
                  <ReviewGroupHeading>{"?????? ??????"}</ReviewGroupHeading>
                  { getReviewsState.status === SagaStatus.LOADING 
                    ? <Loading/>
                    : (
                      <>
                        <ReviewGroupContentDiv>
                          {(avgStars === undefined) || isNaN(avgStars)
                            ? ("????????? ????????????")
                            : (
                              <ReviewPeopleReviewsSummaryDiv>
                                <span>{"?????? ??????"}</span>
                                <span>{`${avgStars.toFixed(1)}/5`}</span>
                              </ReviewPeopleReviewsSummaryDiv>
                            )
                          }
                          <ReviewPeopleReviewsListDiv>
                            {(getReviewsState.data?.data?.reviewsResponseDtoList || []).map((item, index)=>(
                              <SummaryReview
                                key={`review-${index}`}
                                data={item}
                                onClick={()=>hanldeSummaryReviewClick(item)}
                              />
                            ))}
                          </ReviewPeopleReviewsListDiv>
                        </ReviewGroupContentDiv>
                      </>
                    )
                  }
                </ReviewPeopleDiv>
              </ReviewInfoDiv>
            </ContentDiv>
          )}
        </MainDiv>
      </div>
      {isModalReviewUpsertOpen }
      <ModalReviewUpsert 
        placeId={placeId} 
        isOpen={isModalReviewUpsertOpen} 
        setIsOpen={setIsModalReviewUpsertOpen}
        data={myReview}
      />
      {readingReviewData && (
        <ModalReviewRead 
          isOpen={isModalReviewReadOpen} 
          setIsOpen={setIsModalReviewReadOpen} 
          data={readingReviewData}
          onClickConfirm={onClickConfirmModalReviewRead}
        />
      )}
    </TemplateBasic>
  )
}