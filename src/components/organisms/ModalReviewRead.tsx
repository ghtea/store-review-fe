import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Review } from '../../store/reaction';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';
import { Modal, ModalProps } from '../molecules/Modal';
import { ModalCommentUpsert } from './ModalCommentUpsert';
import { SummaryComment } from './SummaryComment';

export type ModalReviewReadProps = ModalProps & {
  data: Review
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

export const ModalReviewRead:React.FunctionComponent<ModalReviewReadProps> = ({
  isOpen,
  setIsOpen,
  data,
}) => {
  const [images, setImages] = useState<string[]>([])
  const [isOpenModalCommentUpsert, setIsOpenModalCommentUpsert] = useState(false)

  const handleClearButtonClick = useCallback((index: number)=>{
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }, [images])


  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const handleConfirmClick = useCallback(()=>{

  },[])

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"리뷰"}
        confirmTitle={"수정하기"}
        onClickConfirm={handleConfirmClick}
      >
        <ReviewMetaInfoDiv>
          <ReviewAuthorSpan>author</ReviewAuthorSpan>
          <ReviewTimeSpan>{updatedAtText}</ReviewTimeSpan>
        </ReviewMetaInfoDiv>          
              
        <RatingWrapper>
          <Rating readonly={true} ratingValue={0} size={32}/>
        </RatingWrapper>
        <ReviewParagraph/>
        <ImageCollectionDiv>
          {images.map((item, index) => (
            <ImageWrapper key={`image-${index}`}>
              <ReviewImage src={item} ></ReviewImage>
              <Button onClick={()=>handleClearButtonClick(index)} status={"neutral"}>clear</Button>
            </ImageWrapper>
          ))}
        </ImageCollectionDiv>
        <CommentCollectionDiv>
          {[].map((item, index) => (
            <SummaryCommentWrapper key={`summary-comment-${index}`}>
              <SummaryComment data={item}/>
            </SummaryCommentWrapper>
          ))}
        </CommentCollectionDiv>
      </Modal>
      <ModalCommentUpsert isOpen={isOpenModalCommentUpsert} setIsOpen={setIsOpenModalCommentUpsert}/>
    </>
  )
}