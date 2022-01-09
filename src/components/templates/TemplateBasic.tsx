import React from 'react';
import styled from 'styled-components';
import { Button } from '../atoms/Button';

export type TemplateBasicProps = {
}

const MENU_HEIGHT_PX = 60

const TemplateBasicDiv = styled.div`
	width: 100vw;
	height: 100vh;
`;

const MenuWrapper = styled.div`
	width: 100%;
	height: ${MENU_HEIGHT_PX}px;
`;

const MenuDiv = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-left: 16px;
	padding-right: 16px;
	// background-color: transparent;
`;

const ServiceLogoSpan = styled.span`
	color: ${props => props.theme.colors.primary};
	font-size: 1.25rem;
	font-weight: 700;
`

const LoginButton = styled(Button)`
	background-color: ${props => props.theme.colors.primary};
	color: ${props => props.theme.colors.textAlternative};

`

const ContentWrapper = styled.div`
	width: 100%;
	height: calc(100% - ${MENU_HEIGHT_PX}px);
	background-color: #DDD;
`;

export const TemplateBasic:React.FunctionComponent<TemplateBasicProps> = ({
	children
}) => {

	return (
		<TemplateBasicDiv>
			<MenuWrapper>
				<MenuDiv>
					<div>
						<ServiceLogoSpan>
							여기모아
						</ServiceLogoSpan>
					</div>

					<div>
						<LoginButton status={"primary"}>
							로그인
						</LoginButton>
					</div>
				</MenuDiv>
			</MenuWrapper>
			<ContentWrapper>
				{children}
			</ContentWrapper>
		</TemplateBasicDiv>
	)
}