import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Comment } from '../../store/reaction';

export type SummaryCommentProps = {
  onClick?: () => void
  data: Comment
}

const SummaryCommentDiv = styled.div`
	width: 100%;
	height: 80px;
	padding: 16px;

	&:nth-child(n+2){
		border-width: 1px;
		border-top-style: solid;
		border-color: #d0d0d0;
	}
`
const CommentMetaInfoDiv = styled.div`
  flex-direction: row;
  align-items: flex-end;
`

const CommentAuthorSpan = styled.span`
	font-size: 1.125rem;
	padding-left: 4px;
`

const CommentCreatedAtSpan = styled.span`
	color: ${props => props.theme.colors.textHint};
`

const CommentParagraph = styled.p`
  flex: 1;
`

export const SummaryComment:React.FunctionComponent<SummaryCommentProps> = ({
  onClick = () => {},
  data
}) => {
  const handleClick = useCallback(()=>{
    onClick?.()
  },[onClick])

  const updatedAtText = useMemo(()=>{
    return dayjs(data.updatedAt).format("YYYY-M-D") 
  },[data.updatedAt])

  return (
    <SummaryCommentDiv onClick={handleClick}>
      <CommentMetaInfoDiv>
        <CommentAuthorSpan>{data.said/*TODO: replace by name of auther*/}</CommentAuthorSpan>
        <CommentCreatedAtSpan>{updatedAtText}</CommentCreatedAtSpan>
      </CommentMetaInfoDiv>             
      <CommentParagraph>{data.content}</CommentParagraph>
    </SummaryCommentDiv>
  )
}