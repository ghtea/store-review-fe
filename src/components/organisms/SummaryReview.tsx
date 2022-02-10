import dayjs from 'dayjs';
import React, { useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Review } from '../../store/reaction';
import { Rating } from '../atoms/Rating';
import { decode } from 'js-base64';

export type SummaryReviewProps = {
  onClick?: () => void
  data: Review
}

const SummaryReviewDiv = styled.div`
	width: 100%;
	max-width: 640px;
	height: 200px;
	padding: 16px;
  cursor: pointer;

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
    return dayjs(data.updatedAt).format("YYYY-M-D") 
  },[data.updatedAt])

  const additionalImageCount = useMemo(()=>{
    if (!data.imgUrl || !data.imgUrl.length) { // TODO: replace it by data.images
      return 0
    }
    else {
      return (data.imgUrl.length - 1) // TODO: replace it by data.images
    }
  },[data.imgUrl])

  const content = useMemo(()=>{
    return decode(data.content)
  }, [data.content])

  const imgUrl = useMemo(()=>{
    return (data.imgUrl || []).map(decode)
  }, [data.imgUrl])

  useEffect(()=>{
    console.log("data: ", data); // TODO: remove 
  },[data])
  return (
    <SummaryReviewDiv onClick={handleClick}>
      <TopDiv>
        <TopNameSpan>{data.userId}</TopNameSpan>
        <TopInfoDiv>
          <Rating ratingValue={4} size={24} readonly/>
          <TopInfoDateSpan>{updatedAtText}</TopInfoDateSpan>
        </TopInfoDiv>
      </TopDiv>
													
      <BottomDiv>
        <BottomRightDiv>
          <ReviewParagraph>{content}</ReviewParagraph>
          <CommentSpan>{`${data.commentNum} comments`}</CommentSpan>
        </BottomRightDiv>

        <BottomLeftDiv>
          <ImageDiv>
            {imgUrl[0] && (
              <Image src={imgUrl[0]} />
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