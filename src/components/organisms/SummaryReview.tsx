import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Review } from '../../store/reaction';
import { Rating } from '../atoms/Rating';

export type SummaryReviewProps = {
  onClick?: () => void
  data: Review
}

const SummaryReviewDiv = styled.div`
	width: 100%;
	max-width: 640px;
	height: 200px;
	padding: 16px;

	&:nth-child(n+2){
		border-width: 1px;
		border-top-style: solid;
		border-color: #d0d0d0;
	}
`

const TopDiv = styled.div`
	
`

const TopNameSpan = styled.span`
	font-size: 1.125rem;
	padding-left: 4px;
`

const TopInfoDiv = styled.div`
	margin-top: 8px;
	flex-direction: row;
	align-items: center;
	& > *:nth-child(n+2) {
		margin-left: 8px;
	}
`

const TopInfoDateSpan = styled.span`
	color: ${props => props.theme.colors.textHint};
`

const BottomDiv = styled.div`
	flex-direction: row;
	padding: 16px;
  height: 100%;
  align-items: stretch;
`

const BottomLeftDiv = styled.div`
	align-items: center;
	width: 120px;
`

const ReviewParagraph = styled.p`
  flex: 1;
`

const CommentSpan = styled.span`
  color: ${props => props.theme.colors.textHint};
`

const BottomRightDiv = styled.div`
	flex: 1;
  height: 100%;
`

const ImageDiv = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const ImagePlusDiv = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`


export const SummaryReview:React.FunctionComponent<SummaryReviewProps> = ({
  onClick = () => {},
  data
}) => {
  const handleClick = useCallback(()=>{
    onClick?.()
  },[onClick])

  const updatedAtText = useMemo(()=>{
    return dayjs(data.updated_at).format("YYYY-M-D") 
  },[data.updated_at])

  const additionalImageCount = useMemo(()=>{
    if (false) { // TODO: replace it by data.images
      return 0
    }
    else {
      return ([1,3].length - 1) // TODO: replace it by data.images
    }
  },[])

  return (
    <SummaryReviewDiv onClick={handleClick}>
      <TopDiv>
        <TopNameSpan>{data.said}</TopNameSpan>
        <TopInfoDiv>
          <Rating ratingValue={data.stars} size={24}/>
          <TopInfoDateSpan>{updatedAtText}</TopInfoDateSpan>
        </TopInfoDiv>
      </TopDiv>
													
      <BottomDiv>
        <BottomRightDiv>
          <ReviewParagraph>{data.content}</ReviewParagraph>
          <CommentSpan> 6 comments {/* TODO: data.commentIds */}</CommentSpan>
        </BottomRightDiv>

        <BottomLeftDiv>
          <ImageDiv>
            {["ddd"][0] && (
              <Image src={["ddd"][0]} />
            )}
            {additionalImageCount > 0 && (
              <ImagePlusDiv>{`+${additionalImageCount}`}</ImagePlusDiv>
            )}
          </ImageDiv>
        </BottomLeftDiv>
      </BottomDiv>
    </SummaryReviewDiv>
  )
}