import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  status?: "primary" | "neutral" | "error";
  shape?: "rounded" | "custom"
  disabled?: boolean
}

const StyledButton = styled.button<ButtonProps>`

  ${props => props.status === "primary" && css`
    background-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.textAlternative};
    border: none;
  `}
  ${props => props.status === "error" && css`
    background-color: ${props.theme.colors.error};
    color: ${props.theme.colors.textAlternative};
    border: none;
  `}
  ${props => props.status === "neutral" && css`
    background-color: #fff;
    color: ${props.theme.colors.textDefault};
    border: 1px solid #ccc;
  `}

  // override others
  ${props => props.disabled && css`
    background-color: #ddd;
    color: ${props.theme.colors.textDisabled};
    border: none;
    cursor: default;
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
  disabled = false,
  onClick: _onClick,
  ...rest
}) => {
  const onClick: React.MouseEventHandler<HTMLButtonElement> = useCallback((event)=>{
    if (disabled) return
    _onClick?.(event);
  },[_onClick, disabled])

  return (
    <StyledButton status={status} disabled={disabled} shape={shape} onClick={onClick} {...rest}>
      {children}
    </StyledButton>
  )
}