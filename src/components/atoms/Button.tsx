import React from 'react';
import styled, { css } from 'styled-components';

export type ButtonProps = {
  status?: "primary" | "neutral";
  shape?: "rounded" | "full"
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

  ${props => props.shape === "rounded" && css`
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 8px;
    padding-bottom: 8px;

    border-radius: 4px;
  `}
  ${props => props.shape === "full" && css`
    width: 100%;
    height: 100%;
  `}
`

export const Button:React.FunctionComponent<ButtonProps> = ({
	children,
  status = "neutral",
  shape = "rounded"
}) => {

	return (
		<StyledButton status={status} shape={shape}>
			{children}
		</StyledButton>
	)
}