import React from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';
import { Rating } from '../atoms/Rating';

export type ModalReviewUpsertProps = {
  isOpen: boolean
}

const FullScreenDiv = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
`

const ModalDiv = styled.div`
  width: 100%;
  min-width: 360px;
  max-width: 640px;
  border-radius: 8px;
  background-color: #ffffff;
  align-items: center;
  padding: 16px;
`

const HeaderDiv = styled.div`
  align-items: center;
`

const ContentDiv = styled.div`
  margin-top: 32px;
  align-items: center;
`

const ModalTitleHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;

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


const ReviewSubmitButton = styled(Button)`
	margin-top: 32px;
  width: 100%;
`

export const ModalReviewUpsert:React.FunctionComponent<ModalReviewUpsertProps> = ({
  
  isOpen
}) => {

  return (
    <>
      {isOpen && (
        <FullScreenDiv>
          <ModalDiv>
            <HeaderDiv>
              <ModalTitleHeading>리뷰 작성</ModalTitleHeading>
            </HeaderDiv>
            <ContentDiv>
              <Rating ratingValue={2.5} size={32}/>
              <ReviewTextarea onChange={(event)=>{}}/>
              <div>images</div>
              <ReviewSubmitButton status={"primary"}>등록</ReviewSubmitButton>
            </ContentDiv>
          </ModalDiv>
        </FullScreenDiv>
      )}
    </>
    
  )
}