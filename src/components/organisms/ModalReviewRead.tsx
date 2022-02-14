import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Review } from '../../store/reaction';
import { Rating } from '../atoms/Rating';
import { Modal, ModalProps } from '../molecules/Modal';
import { ModalCommentUpsert } from './ModalCommentUpsert';
import { SummaryComment } from './SummaryComment';
import { decode } from 'js-base64';
import { RootState } from '../../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../atoms/Button';
import { ModalCommentRead } from './ModalCommentRead';
import { Comment } from '../../store/reaction';
import { reactionStore } from '../../store';
import { Loading } from '../atoms/Loading';
import { SagaStatus } from '../../store/type';
import { decryptAes } from '../../utils/crypto';

export type ModalReviewReadProps = ModalProps & {
  data: Review,
}

const ReviewMetaInfoDiv = styled.div`
  flex-direction: row;
  align-items: flex-end;
`

const ReviewAuthorSpan = styled.span`
  color: ${props => props.theme.colors.textDefault};
  font-size: 1.125rem;
`

const ReviewTimeSpan = styled.span`
  margin-left: 16px;
  color: ${props => props.theme.colors.textHint};
`

const RatingWrapper = styled.div`
  margin-top: 8px;
`

const ReviewParagraph = styled.p`
	width: 90%;
	height: 240px;
	padding: 8px;
	margin-top: 8px;
	margin-left: 8px;
	margin-right: 8px;
  overflow: auto;
`

const ImageCollectionDiv = styled.div`
  flex-direction: row;
  overflow-x: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  flex-shrink: 0;
`

const ImageWrapper = styled.div`
  width: 100px;

  &:nth-child(n+2){
    margin-left: 16px;
  }
`

const ReviewImage = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`

const CommentCollectionDiv = styled.div`
  width: 100%;
  padding-left: 8px;
  padding-right: 8px;
  margin-top: 8px;
  margin-bottom: 8px;
  max-height: 300px;
  overflow-x: auto;
`

const SummaryCommentWrapper = styled.div`
  &:nth-child(n+2){
    border-top-style: solid;
    border-width: 1px;
    border-color: #d8d8d8;
  }  
`
const CommentUpsertButton = styled(Button)`
	margin-top: 8px;
`

export const ModalReviewRead:React.FunctionComponent<ModalReviewReadProps> = ({
  isOpen,
  setIsOpen,
  data,
  onClickConfirm
}) => {
  const authStore = useSelector((state: RootState) => state.auth);
  const getCommentsState = useSelector((state: RootState) => state.reaction.getComments);
  const dispatch = useDispatch();

  const [isOpenModalCommentUpsert, setIsOpenModalCommentUpsert] = useState(false)
  const [upsertingCommentData, setUpsertingCommentData] = useState<Comment | undefined>(undefined)
  const [readingCommentData, setReadingCommentData] = useState<Comment | undefined>(undefined)
  const [isModalCommentReadOpen , setIsModalCommentReadOpen] = useState(false)

  const isAuthor = useMemo(()=>{
    return authStore.data?.said && authStore.data?.said === decryptAes(data.said)
  },[authStore.data?.said, data.said])

  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const getComments = useCallback((reviewId: number, pageNo: number)=>{
    dispatch(reactionStore.return__GET_COMMENTS({
      reviewId: reviewId,
      pageNo: pageNo,
    }))
  },[dispatch])

  useEffect(()=>{
    if (!data.reviewId ) return

    getComments(data.reviewId, 0)
  },[data.reviewId, getComments])

  // reset commnets
  useEffect(()=>{
    if (!isOpen){
      dispatch(reactionStore.return__RESET_GET_COMMENTS());
    }
  },[dispatch, isOpen])

  const handleConfirmClick = useCallback(()=>{
    onClickConfirm?.();
  },[onClickConfirm])

  const hanldeSummaryCommentClick = useCallback((commentData)=>{
    setIsModalCommentReadOpen(true)
    setReadingCommentData(commentData)
  },[])

  const handleCommentCreateClick = useCallback(()=>{
    setIsOpenModalCommentUpsert(true)
    setUpsertingCommentData(undefined)
  },[])

  const onClickUpdateCommentInModalCommentRead = useCallback(()=>{
    setIsModalCommentReadOpen(false)
    setIsOpenModalCommentUpsert(true)
    setUpsertingCommentData(readingCommentData)
  },[readingCommentData])

  const content = useMemo(()=>{
    return decode(data.content)
  }, [data.content])

  const imgUrl = useMemo(()=>{
    return (data.imgUrl || []).map(decode)
  }, [data.imgUrl])

  const onClickMore = useCallback(()=>{
    getComments(data.reviewId, getCommentsState.pageNo === undefined ? 0 : getCommentsState.pageNo +1 )
  },[data.reviewId, getComments, getCommentsState.pageNo])

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"리뷰"}
        confirmTitle={isAuthor ? "수정하기" : ""}
        onClickConfirm={handleConfirmClick}
        confirmStatus={"neutral"}
      >
        <ReviewMetaInfoDiv>
          <ReviewAuthorSpan>{data.userId}</ReviewAuthorSpan>
          <ReviewTimeSpan>{updatedAtText}</ReviewTimeSpan>
        </ReviewMetaInfoDiv>          
              
        <RatingWrapper>
          <Rating readonly={true} ratingValue={data.stars} size={32}/>
        </RatingWrapper>
        <ReviewParagraph>{content}</ReviewParagraph>
        <ImageCollectionDiv>
          {imgUrl.map((item, index) => (
            <ImageWrapper key={`image-${index}`}>
              <ReviewImage src={item} ></ReviewImage>
            </ImageWrapper>
          ))}
        </ImageCollectionDiv>
        { (getCommentsState.status === SagaStatus.LOADING && (getCommentsState.allComments || []).length === 0)
          ? <Loading/>
          : (
            <CommentCollectionDiv>
              {(getCommentsState.allComments || []).map((item, index) => (
                <SummaryCommentWrapper key={`summary-comment-${index}`}>
                  <SummaryComment 
                    data={item} 
                    onClick={()=>hanldeSummaryCommentClick(item)}
                  />
                </SummaryCommentWrapper>
              ))}
              {getCommentsState.hasMore && (
                <Button onClick={onClickMore}>더보기</Button>
              )}
            </CommentCollectionDiv>
          )
        }
        <CommentUpsertButton
          onClick={handleCommentCreateClick}
          disabled={!authStore.authenticated}
        >
          코멘트 작성
        </CommentUpsertButton>
      </Modal>
      <ModalCommentUpsert 
        isOpen={isOpenModalCommentUpsert} 
        setIsOpen={setIsOpenModalCommentUpsert}
        data={upsertingCommentData}
        reviewId={data.reviewId}
      />
      {readingCommentData && (
        <ModalCommentRead 
          isOpen={isModalCommentReadOpen} 
          setIsOpen={setIsModalCommentReadOpen} 
          data={readingCommentData}
          onClickConfirm={onClickUpdateCommentInModalCommentRead} // onClickeUpdateComment
        />
      )}
    </>
  )
}