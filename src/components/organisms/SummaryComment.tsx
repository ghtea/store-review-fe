import dayjs from 'dayjs';
import { decode } from 'js-base64';
import React, { useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { Comment } from '../../store/reaction';

export type SummaryCommentProps = {
  onClick?: () => void
  data: Comment
}

const SummaryCommentDiv = styled.div`
	width: 100%;
	padding: 16px;
  max-height: 120px;
  overflow: auto;
  cursor: pointer;

	&:nth-child(n+2){
		border-width: 1px;
		border-top-style: solid;
		border-color: #d0d0d0;
	}
`
const CommentMetaInfoDiv = styled.div`
  flex-direction: column;
`

const CommentAuthorSpan = styled.span`
	font-size: 1.125rem;
`

const CommentCreatedAtSpan = styled.span`
  margin-top: 4px;
	color: ${props => props.theme.colors.textHint};
`

const CommentParagraph = styled.p`
  margin-top: 8px;
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

  const content = useMemo(()=>{
    return decode(data.content)
  }, [data.content])

  return (
    <SummaryCommentDiv onClick={handleClick}>
      <CommentMetaInfoDiv>
        <CommentAuthorSpan>{data.userId}</CommentAuthorSpan>
        <CommentCreatedAtSpan>{updatedAtText}</CommentCreatedAtSpan>
      </CommentMetaInfoDiv>             
      <CommentParagraph>{content}</CommentParagraph>
    </SummaryCommentDiv>
  )
}