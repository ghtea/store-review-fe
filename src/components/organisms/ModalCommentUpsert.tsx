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
import { SagaStatus } from '../../store/type';

export type ModalCommentUpsertProps = ModalProps & {
  data?: Comment
  reviewId: number
}

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
  const putCommentState = useSelector((state: RootState) => state.reaction.putComment);
  const deleteCommentState = useSelector((state: RootState) => state.reaction.deleteComment);

  const [draftComment, setDraftComment] = useState("")

  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const resetDraft = useCallback(()=>{
    setDraftComment("")
  },[])

  useEffect(()=>{
    if (!isOpen) return;
    if (data){
      setDraftComment(decode(data.content))
    }
    else {
      resetDraft()
    }
  },[data, isOpen, resetDraft])

  useEffect(()=>{
    if (postCommentState.status === SagaStatus.SUCCESS){
      resetDraft()
    }
  },[postCommentState.status, resetDraft])

  useEffect(()=>{
    if (deleteCommentState.status  === SagaStatus.SUCCESS){
      resetDraft()
    }
  },[deleteCommentState.status, resetDraft])

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
    if (postCommentState.status  === SagaStatus.SUCCESS){
      setIsOpen(false)
    }
  },[postCommentState.status, setIsOpen])

  useEffect(()=>{
    if (putCommentState.status  === SagaStatus.SUCCESS){
      setIsOpen(false)
    }
  },[putCommentState.status, setIsOpen])

  useEffect(()=>{
    if (deleteCommentState.status  === SagaStatus.SUCCESS){
      setIsOpen(false)
    }
  },[deleteCommentState.status, setIsOpen])

  const handleDelete = useCallback(()=>{
    if (!data?.commentId) return;

    dispatch(reactionStore.return__DELETE_COMMENT({
      commentId: data.commentId,
    }))
  },[data?.commentId, dispatch])

  const confirmDisabled = useMemo(()=>{
    return (
      postCommentState.status === SagaStatus.LOADING ||
      putCommentState.status === SagaStatus.LOADING ||
      deleteCommentState.status === SagaStatus.LOADING
    ) 
  }, [deleteCommentState.status, postCommentState.status, putCommentState.status])

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={data ? "댓글 수정" : "댓글 등록"}
      confirmTitle={ data ? "수정" : "등록"}
      onClickConfirm={handleConfirmClick}
      confirmDisabled={confirmDisabled}
    >
      <UpdatedAtSpan>{updatedAtText}</UpdatedAtSpan>
      <CommentTextarea onChange={handleTextAreaChange} value={draftComment}/>
      <DeleteButtonContainerDiv>
        {data?.commentId && (
          <Button onClick={handleDelete} status="error" disabled={deleteCommentState.status === SagaStatus.LOADING}>{"코멘트 삭제"}</Button>
        )}
      </DeleteButtonContainerDiv>
    </Modal>
  )
}