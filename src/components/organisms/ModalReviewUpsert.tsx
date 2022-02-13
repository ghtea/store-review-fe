import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reactionStore } from '../../store';
import { Review } from '../../store/reaction';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';
import { Modal, ModalProps } from '../molecules/Modal';
import { decode } from 'js-base64';
import { SagaStatus } from '../../store/type';

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
  const dispatch = useDispatch()
  const postReviewState = useSelector((state: RootState) => state.reaction.postReview);
  const deleteReviewState = useSelector((state: RootState) => state.reaction.deleteReview);
  const putReviewState = useSelector((state: RootState) => state.reaction.putReview);

  const [draftRating, setDraftRating] = useState(0)
  const [draftReview, setDraftReview] = useState("")
  const [localImgUrl, setLocalImgUrl] = useState<string[]>([])
  const [serverImgUrl, setServerImgUrl] = useState<string[]>([])
  const [draftImageFiles, setDraftImageFiles] = useState<File[]>([])

  const resetDraft = useCallback(()=>{
    setDraftRating(0)
    setDraftReview("")
    setLocalImgUrl([])
    setServerImgUrl([])
  },[])

  useEffect(()=>{
    if (!isOpen) return;
    if (data){
      setDraftRating(data.stars)
      setDraftReview(decode(data.content))
      setServerImgUrl((data.imgUrl || []).map(item => decode(item)))
    }
    else {
      resetDraft()
    }
  },[data, isOpen, resetDraft])

  useEffect(()=>{
    if (postReviewState.status  === SagaStatus.SUCCESS){
      resetDraft()
    }
  },[postReviewState.status, resetDraft])

  useEffect(()=>{
    if (deleteReviewState.status  === SagaStatus.SUCCESS){
      resetDraft()
    }
  },[deleteReviewState.status, resetDraft])

  const handleLocalImageClear = useCallback((index: number)=>{
    const newLocalImgUrl = [...localImgUrl]
    newLocalImgUrl.splice(index, 1)
    setLocalImgUrl(newLocalImgUrl)
  }, [localImgUrl])

  const handleServerImageClear = useCallback((index: number)=>{
    const newServerImgUrl = [...serverImgUrl]
    newServerImgUrl.splice(index, 1)
    setServerImgUrl(newServerImgUrl)
  }, [serverImgUrl])

  const handleReviewImageInputChange: React.ChangeEventHandler<HTMLInputElement> = useCallback( (event) => {
    const files = event.currentTarget.files
    const file = files?.[0];
    if (file){
      const reader = new FileReader();
      reader.onloadend = (readerEvent) => {
        const result = readerEvent?.target?.result;
        if (typeof result === "string"){
          setLocalImgUrl(prev => [...prev, result])
        }
      };
      setDraftImageFiles(prev => [...prev, file])
      reader.readAsDataURL(file);
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
    if (data){
      dispatch(reactionStore.return__PUT_REVIEW({
        reviewId: data.reviewId,
        content: draftReview,
        stars: draftRating,
        serverImgUrl: serverImgUrl,
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
  },[data, dispatch, draftImageFiles, draftRating, draftReview, serverImgUrl, placeId])

  useEffect(()=>{
    if (postReviewState.status  === SagaStatus.SUCCESS){
      setIsOpen(false)
      setLocalImgUrl([])
      setDraftImageFiles([])
    }
  },[postReviewState.status, setIsOpen])

  useEffect(()=>{
    if (putReviewState.status  === SagaStatus.SUCCESS){
      setIsOpen(false)
      setLocalImgUrl([])
      setDraftImageFiles([])
    }
  },[putReviewState.status, setIsOpen])

  useEffect(()=>{
    if (deleteReviewState.status  === SagaStatus.SUCCESS){
      setIsOpen(false)
    }
  },[deleteReviewState.status, setIsOpen])

  const handleDelete = useCallback(()=>{
    if (!data?.reviewId) return;

    dispatch(reactionStore.return__DELETE_REVIEW({
      reviewId: data.reviewId,
    }))
  },[data?.reviewId, dispatch])

  const confirmDisabled = useMemo(()=>{
    return (
      postReviewState.status === SagaStatus.LOADING ||
      putReviewState.status === SagaStatus.LOADING ||
      deleteReviewState.status === SagaStatus.LOADING
    ) 
  }, [deleteReviewState.status, postReviewState.status, putReviewState.status])

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={data ? "리뷰 수정" : "리뷰 등록"}
      confirmTitle={ data ? "수정" : "등록"}
      onClickConfirm={handleConfirmClick}
      confirmDisabled={confirmDisabled}
    >
      <UpdatedAtSpan>{updatedAtText}</UpdatedAtSpan>
      <RatingWrapper>
        <Rating ratingValue={draftRating} size={32} onClick={handleRatingClick}/>
      </RatingWrapper>
      <ReviewTextarea onChange={handleReviewTextareaChange} value={draftReview}/>
      <ImageCollectionDiv>
        {serverImgUrl.map((item, index) => (
          <ImageWrapper key={`image-${index}`}>
            <ReviewImage src={item} ></ReviewImage>
            <Button onClick={()=>handleServerImageClear(index)} status={"neutral"}>clear</Button>
          </ImageWrapper>
        ))}
        {localImgUrl.map((item, index) => (
          <ImageWrapper key={`image-${index}`}>
            <ReviewImage src={item} ></ReviewImage>
            <Button onClick={()=>handleLocalImageClear(index)} status={"neutral"}>clear</Button>
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
          <Button onClick={handleDelete} status="error" disabled={deleteReviewState.status === SagaStatus.LOADING}>{"리뷰 삭제"}</Button>
        )}
      </DeleteButtonContainerDiv>
    </Modal>
  )
}