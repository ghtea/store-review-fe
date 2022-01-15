import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Rating } from '../atoms/Rating';

export type ModalReviewUpsertProps = {
  onClick?: () => void
}


const SummaryReviewDiv = styled.div`
	width: 100%;
	max-width: 640px;
	height: 180px;
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
`

const BottomLeftDiv = styled.div`
	align-items: center;
	width: 120px;
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


export const SummaryReview:React.FunctionComponent<ModalReviewUpsertProps> = ({
  onClick = () => {}
}) => {
  const handleClick = useCallback(()=>{
    onClick?.()
  },[onClick])

  return (
    <SummaryReviewDiv onClick={handleClick}>
      <TopDiv>
        <TopNameSpan>잡스</TopNameSpan>
        <TopInfoDiv>
          <Rating ratingValue={2.5} size={24}/>
          <TopInfoDateSpan>2011.1.1.</TopInfoDateSpan>
        </TopInfoDiv>
      </TopDiv>
													
      <BottomDiv>
        <BottomRightDiv>
          <p>맛 없습니다</p>
        </BottomRightDiv>

        <BottomLeftDiv>
          <ImageDiv>
            <Image />
            <ImagePlusDiv>{"+3"}</ImagePlusDiv>
          </ImageDiv>
        </BottomLeftDiv>
      </BottomDiv>
    </SummaryReviewDiv>
  )
}