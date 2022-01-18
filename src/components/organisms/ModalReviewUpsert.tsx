import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Review } from '../../store/reaction';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';
import { Modal, ModalProps } from '../molecules/Modal';

export type ModalReviewUpsertProps = ModalProps & {
  data?: Review
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
}) => {
  const [images, setImages] = useState<string[]>([])

  const handleClearButtonClick = useCallback((index: number)=>{
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }, [images])

  const handleReviewImageInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback( (event) => {
    const files = event.currentTarget.files
    const theFile = files?.[0];
    if (theFile){
      const reader = new FileReader();
      reader.onloadend = (readerEvent) => {
        const result = readerEvent?.target?.result;
        if (typeof result === "string"){
          setImages(prev => [...prev, result])
        }
      };
      reader.readAsDataURL(theFile);
    }
  },[]);

  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const handleConfirmClick = useCallback(()=>{

  },[])

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
        <Rating ratingValue={2.5} size={32}/>
      </RatingWrapper>
      <ReviewTextarea onChange={(event)=>{}}/>
      <ImageCollectionDiv>
        {images.map((item, index) => (
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