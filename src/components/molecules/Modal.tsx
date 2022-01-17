import dayjs from 'dayjs';
import React, { Children, useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';

export type ModalProps = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  title?: string

  onClickConfirm?: () => void
  confirmTitle?: string
}

const Wrapper = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const BackgroundDiv = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
`

const ModalDiv = styled.div`
  position: absolute;
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
  width: 100%;
  margin-top: 32px;
  align-items: center;
`

const FooterDiv = styled.div`
  align-items: center;
`

const ModalTitleHeading = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;

`

export const Modal:React.FunctionComponent<ModalProps> = ({
  isOpen,
  setIsOpen,
  title,
  children,
  onClickConfirm,
  confirmTitle,
}) => {

  const handleBackgroundClick = useCallback(()=>{
    setIsOpen(false)
  }, [setIsOpen])


  return (
    <>
      {isOpen && (
        <Wrapper>
          <BackgroundDiv onClick={handleBackgroundClick}/>
          <ModalDiv>
            <HeaderDiv>
              <ModalTitleHeading>{title}</ModalTitleHeading>
            </HeaderDiv>
            <ContentDiv>
              {children}
            </ContentDiv>
            <FooterDiv>
              {onClickConfirm && (
                <Button status={"primary"}>{confirmTitle}</Button>
              )}
            </FooterDiv>
          </ModalDiv>
        </Wrapper>
      )}
    </>
  )
}