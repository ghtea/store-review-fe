import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { reactionStore } from '../../store';
import { Comment } from '../../store/reaction';
import { Modal, ModalProps } from '../molecules/Modal';
import { decode } from 'js-base64';
import { RootState } from '../../store/reducers';
import { Button } from '../atoms/Button';

export type ModalCommentUpsertProps = ModalProps & {
  data?: Comment
  reviewId: number
}

const SummaryReviewWrapper = styled.div`
  width: 100%;
  padding-left: 32px;
  padding-right: 32px;
`

const UpdatedAtSpan = styled.span`
  color: ${props => props.theme.colors.textHint};
  font-size: 1.125rem;
`

const CommentTextarea = styled.textarea`
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

const DeleteButtonContainerDiv = styled.div`
  margin-top: 16px;
`

export const ModalCommentUpsert:React.FunctionComponent<ModalCommentUpsertProps> = ({
  data,
  isOpen,
  setIsOpen,
  reviewId,
}) => {  
  const dispatch = useDispatch()
  const postCommentState = useSelector((state: RootState) => state.reaction.postComment);

  const [draftComment, setDraftComment] = useState("")

  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  useEffect(()=>{
    if (data){
      setDraftComment(decode(data.content))
    }
    else {
      setDraftComment("")
    }
  },[data])

  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((event)=>{
    setDraftComment(event.currentTarget.value || "")
  },[])

  const handleConfirmClick = useCallback(()=>{
    if (data){
      dispatch(reactionStore.return__PUT_COMMENT({
        commentId: data.commentId,
        content: draftComment,
      }))
    }
    else {
      dispatch(reactionStore.return__POST_COMMENT({
        reviewId: reviewId,
        content: draftComment,
      }))
    }
  },[data, dispatch, draftComment, reviewId])

  useEffect(()=>{
    if (postCommentState.status.ready){
      setIsOpen(false)
    }
  },[postCommentState.status.ready, setIsOpen])

  const handleDelete = useCallback(()=>{
    if (!data?.commentId) return;

    dispatch(reactionStore.return__DELETE_COMMENT({
      commentId: data.commentId,
    }))
  },[data?.commentId, dispatch])

  return (
    <Modal
      //isOpen={true}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={data ? "댓글 수정" : "댓글 등록"}
      confirmTitle={ data ? "수정" : "등록"}
      onClickConfirm={handleConfirmClick}
    >
      <SummaryReviewWrapper>
        {/* <SummaryReview data={}/> */}
      </SummaryReviewWrapper>
      <UpdatedAtSpan>{updatedAtText}</UpdatedAtSpan>
      <CommentTextarea onChange={handleTextAreaChange} value={draftComment}/>
      <DeleteButtonContainerDiv>
        {data?.commentId && (
          <Button onClick={handleDelete} status="error">{"코멘트 삭제"}</Button>
        )}
      </DeleteButtonContainerDiv>
    </Modal>
  )
}