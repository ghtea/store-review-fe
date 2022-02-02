import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { reactionStore } from '../../store';
import { Review } from '../../store/reaction';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';
import { Modal, ModalProps } from '../molecules/Modal';

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

export const ModalReviewUpsert:React.FunctionComponent<ModalReviewUpsertProps> = ({
  data,
  isOpen,
  setIsOpen,
  placeId,
}) => {
  const dispatch = useDispatch()
  const [draftRating, setDraftRating] = useState(0)
  const [draftReview, setDraftReview] = useState("")
  const [draftImages, setDraftImages] = useState<string[]>([])

  const handleClearButtonClick = useCallback((index: number)=>{
    const newImages = [...draftImages]
    newImages.splice(index, 1)
    setDraftImages(newImages)
  }, [draftImages])

  const handleReviewImageInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback( (event) => {
    const files = event.currentTarget.files
    const theFile = files?.[0];
    if (theFile){
      const reader = new FileReader();
      reader.onloadend = (readerEvent) => {
        const result = readerEvent?.target?.result;
        if (typeof result === "string"){
          setDraftImages(prev => [...prev, result])
        }
      };
      reader.readAsDataURL(theFile);
    }
  },[]);

  const handleRatingClick = useCallback((value: number) => {
    setDraftRating(value)
  },[])

  const handleReviewTextareaChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((event)=>{
    setDraftReview(event.currentTarget.value || "")
  },[])

  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const handleConfirmClick = useCallback(()=>{
    console.log("yo111"); // TODO: remove
    dispatch(reactionStore.return__POST_REVIEW({
      placeId,
      content: draftReview,
      stars: draftRating,
      imgUrl: draftImages,
    }))
  },[dispatch, draftImages, draftRating, draftReview, placeId])

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
    </Modal>
  )
}