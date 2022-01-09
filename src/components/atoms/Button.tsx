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
    background-color: transparent;
    color: ${props.theme.colors.textDefault};
  `}

  padding-left: 12px;
  padding-right: 12px;
  padding-top: 8px;
  padding-bottom: 8px;

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