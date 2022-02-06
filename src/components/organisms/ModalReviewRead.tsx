import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Review } from '../../store/reaction';
import { Rating } from '../atoms/Rating';
import { Modal, ModalProps } from '../molecules/Modal';
import { ModalCommentUpsert } from './ModalCommentUpsert';
import { SummaryComment } from './SummaryComment';
import { decode } from 'js-base64';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';
import { Button } from '../atoms/Button';
import { ModalCommentRead } from './ModalCommentRead';
import { Comment } from '../../store/reaction';

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
	width: 100%;
	height: 140px;
	padding: 8px;
	margin-top: 8px;
	margin-left: 8px;
	margin-right: 8px;
`

const ImageCollectionDiv = styled.div`
  flex-direction: row;
  overflow-x: auto;
  margin-top: 16px;
  margin-bottom: 16px;
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
  margin-top: 16px;
  margin-bottom: 16px;
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
}) => {
  const authStore = useSelector((state: RootState) => state.auth);

  const [isOpenModalCommentUpsert, setIsOpenModalCommentUpsert] = useState(false)
  const [upsertingCommentData, setUpsertingCommentData] = useState<Comment | undefined>(undefined)
  const [readingCommentData, setReadingCommentData] = useState<Comment | undefined>(undefined)
  const [isModalCommentReadOpen , setIsModalCommentReadOpen] = useState(false)

  const isAuthor = useMemo(()=>{
    return authStore.data?.said && authStore.data?.said === data.said
  },[authStore.data?.said, data.said])

  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const handleConfirmClick = useCallback(()=>{

  },[])

  const hanldeSummaryCommentClick = useCallback((commentData)=>{
    setIsModalCommentReadOpen(true)
    setReadingCommentData(commentData)
  },[])

  const handleCommentCreateClick = useCallback(()=>{
    setIsOpenModalCommentUpsert(true)
    setUpsertingCommentData(undefined)
  },[])

  // const handleCommentUpdateClick = useCallback((commentData: Comment)=>{
  //   setIsOpenModalCommentUpsert(true)
  //   setUpsertingCommentData(commentData)
  // },[])

  const onClickUpdateCommentInModalCommentRead = useCallback(()=>{
    setIsOpenModalCommentUpsert(true)
    setUpsertingCommentData(readingCommentData)
  },[readingCommentData])

  const content = useMemo(()=>{
    return decode(data.content)
  }, [data.content])

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"리뷰"}
        confirmTitle={isAuthor ? "수정하기" : ""}
        onClickConfirm={handleConfirmClick}
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
          {data.imgUrl.map((item, index) => (
            <ImageWrapper key={`image-${index}`}>
              <ReviewImage src={item} ></ReviewImage>
            </ImageWrapper>
          ))}
        </ImageCollectionDiv>
        <CommentCollectionDiv>
          {[].map((item, index) => (
            <SummaryCommentWrapper key={`summary-comment-${index}`}>
              <SummaryComment 
                data={item} 
                onClick={()=>hanldeSummaryCommentClick(item)}
              />
            </SummaryCommentWrapper>
          ))}
        </CommentCollectionDiv>
        <CommentUpsertButton 
          status={"primary"}
          onClick={handleCommentCreateClick}
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