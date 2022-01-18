import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Comment, DUMMY_REVIEW } from '../../store/reaction';
import { Modal, ModalProps } from '../molecules/Modal';
import { SummaryReview } from './SummaryReview';

export type ModalCommentUpsertProps = ModalProps & {
  data?: Comment
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

export const ModalCommentUpsert:React.FunctionComponent<ModalCommentUpsertProps> = ({
  data,
  isOpen,
  setIsOpen,
}) => {
  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const handleConfirmClick = useCallback(()=>{

  },[])

  return (
    <Modal
      isOpen={true}
      //isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={data ? "댓글 수정" : "댓글 등록"}
      confirmTitle={ data ? "수정" : "등록"}
      onClickConfirm={handleConfirmClick}
    >
      <SummaryReviewWrapper>
        <SummaryReview data={DUMMY_REVIEW}/>
      </SummaryReviewWrapper>
      <UpdatedAtSpan>{updatedAtText}</UpdatedAtSpan>
      <CommentTextarea onChange={(event)=>{}}/>
    </Modal>
  )
}