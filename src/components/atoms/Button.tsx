import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  status?: "primary" | "neutral";
  shape?: "rounded" | "custom"
}

const StyledButton = styled.button<ButtonProps>`

  ${props => props.status === "primary" && css`
    background-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.textAlternative};
  `}
  ${props => props.status === "neutral" && css`
    background-color: #fff;
    color: ${props.theme.colors.textDefault};
  `}

  padding-left: 16px;
  padding-right: 16px;
  padding-top: 12px;
  padding-bottom: 12px;

  ${props => props.shape === "rounded" && css`
    border-radius: 4px;
  `}
`

export const Button:React.FunctionComponent<ButtonProps> = ({
  ref,
  children,
  status = "neutral",
  shape = "rounded",
  ...rest
}) => {

  return (
    <StyledButton status={status} shape={shape} {...rest}>
      {children}
    </StyledButton>
  )
}