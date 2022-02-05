import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import styled from 'styled-components';
import { reactionStore } from '../../store';
import { Review } from '../../store/reaction';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';
import { Modal, ModalProps } from '../molecules/Modal';
import { decode } from 'js-base64';

export type ModalReviewUpsertProps = ModalProps & {
  data?: Review
  placeId: string
}


const UpdatedAtSpan = styled.span`
  color: ${props => props.theme.colors.textHint};
  font-size: 1.125rem;
`

const RatingWrapper = styled.div`
  margin-top: 8px;
`

const ReviewTextarea = styled.textarea`
	width: 100%;
	height: 140px;
	padding: 8px;
	margin-top: 8px;
	margin-left: 8px;
	margin-right: 8px;
	border-color: #d0d0d0;
	border-width: 1px;
	border-radius: 4px;
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

const ImageUploadDiv = styled.div`
  input {
    display: none;
  }
`

const DeleteButtonContainerDiv = styled.div`
  margin-top: 16px;
`

export const ModalReviewUpsert:React.FunctionComponent<ModalReviewUpsertProps> = ({
  data,
  isOpen,
  setIsOpen,
  placeId,
}) => {

  useEffect(()=>{
    console.log("data: ", data); // TODO: remove 
  },[data])
  const dispatch = useDispatch()
  const postReviewState = useSelector((state: RootState) => state.reaction.postReview);
  const [draftRating, setDraftRating] = useState(0)
  const [draftReview, setDraftReview] = useState("")
  const [draftImages, setDraftImages] = useState<string[]>([])
  const [draftImageFiles, setDraftImageFiles] = useState<File[]>([])

  useEffect(()=>{
    if (data){
      setDraftRating(data.stars)
      setDraftReview(decode(data.content))
      setDraftImages(data.imgUrl)
    }
  },[data])

  const handleClearButtonClick = useCallback((index: number)=>{
    const newImages = [...draftImages]
    newImages.splice(index, 1)
    setDraftImages(newImages)
  }, [draftImages])

  const handleReviewImageInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback( (event) => {
    const files = event.currentTarget.files
    const file = files?.[0];
    if (file){
      const reader = new FileReader();
      reader.onloadend = (readerEvent) => {
        const result = readerEvent?.target?.result;
        if (typeof result === "string"){
          setDraftImages(prev => [...prev, result])
        }
      };
      setDraftImageFiles(prev => [...prev, file])
      reader.readAsDataURL(file);
    }
  },[]);

  const handleRatingClick = useCallback((value: number) => {
    console.log("value: ", value); // TODO: remove
    setDraftRating(value)
  },[])

  const handleReviewTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((event)=>{
    setDraftReview(event.currentTarget.value || "")
  },[])

  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const handleConfirmClick = useCallback(()=>{
    if (data){
      dispatch(reactionStore.return__PUT_REVIEW({
        reviewId: data.reviewId,
        content: draftReview,
        stars: draftRating,
        imgFileList: draftImageFiles,
      }))
    }
    else {
      dispatch(reactionStore.return__POST_REVIEW({
        placeId,
        content: draftReview,
        stars: draftRating,
        imgFileList: draftImageFiles,
      }))
    }
  },[data, dispatch, draftImageFiles, draftRating, draftReview, placeId])

  useEffect(()=>{
    if (postReviewState.status.ready){
      setIsOpen(false)
    }
  },[postReviewState.status.ready, setIsOpen])

  const handleDelete = useCallback(()=>{
    if (!data?.reviewId) return;

    dispatch(reactionStore.return__DELETE_REVIEW({
      reviewId: data.reviewId,
    }))
  },[data?.reviewId, dispatch])

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={data ? "리뷰 수정" : "리뷰 등록"}
      confirmTitle={ data ? "수정" : "등록"}
      onClickConfirm={handleConfirmClick}
    >
      <UpdatedAtSpan>{updatedAtText}</UpdatedAtSpan>
      <RatingWrapper>
        <Rating ratingValue={draftRating} size={32} onClick={handleRatingClick}/>
      </RatingWrapper>
      <ReviewTextarea onChange={handleReviewTextareaChange} value={draftReview}/>
      <ImageCollectionDiv>
        {draftImages.map((item, index) => (
          <ImageWrapper key={`image-${index}`}>
            <ReviewImage src={item} ></ReviewImage>
            <Button onClick={()=>handleClearButtonClick(index)} status={"neutral"}>clear</Button>
          </ImageWrapper>
        ))}
      </ImageCollectionDiv>
      <ImageUploadDiv>
        <input type="file" accept="image/*" id='input-review-image' 
          onChange={handleReviewImageInputChange}
        />
        <label htmlFor='input-review-image' > 
          Upload Photo 
        </label>
      </ImageUploadDiv>
      <DeleteButtonContainerDiv>
        {data?.reviewId && (
          <Button onClick={handleDelete} status="error">{"리뷰 삭제"}</Button>
        )}
      </DeleteButtonContainerDiv>
    </Modal>
  )
}