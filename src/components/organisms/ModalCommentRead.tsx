import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Comment } from '../../store/reaction';
import { RootState } from '../../store/reducers';
import { Modal, ModalProps } from '../molecules/Modal';
import { decode } from 'js-base64';

export type ModalCommentReadProps = ModalProps & {
  data: Comment
  onClickConfirm: () => void
}


const UpdatedAtSpan = styled.span`
  color: ${props => props.theme.colors.textHint};
  font-size: 1.125rem;
`

const CommentParagraph = styled.p`
	width: 100%;
	height: 140px;
	padding: 8px;
	margin-top: 8px;
	margin-left: 8px;
	margin-right: 8px;
`

export const ModalCommentRead:React.FunctionComponent<ModalCommentReadProps> = ({
  data,
  isOpen,
  setIsOpen,
  onClickConfirm,
}) => {
  const authStore = useSelector((state: RootState) => state.auth);

  const isAuthor = useMemo(()=>{
    return authStore.data?.said && authStore.data?.said === data.said
  },[authStore.data?.said, data.said])


  const updatedAtText = useMemo(()=>{
    return dayjs().format("YYYY-M-D") 
  },[])

  const handleConfirmClick = useCallback(()=>{
    onClickConfirm?.()
  },[onClickConfirm])

  const content = useMemo(()=>{
    return decode(data.content)
  }, [data.content])

  return (
    <Modal
      //isOpen={true}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"댓글"}
      confirmTitle={ isAuthor ? "수정하기" : ""}
      onClickConfirm={handleConfirmClick}
    >
      <UpdatedAtSpan>{updatedAtText}</UpdatedAtSpan>
      <CommentParagraph>{content}</CommentParagraph>
    </Modal>
  )
}