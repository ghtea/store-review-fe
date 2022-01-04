import React from 'react';
import styled from 'styled-components';

export type TemplateBasicProps = {
}

const MENU_HEIGHT_PX = 60

const RootDiv = styled.div`
	width: 100vw;
	height: 100vh;
`;

const MenuWrapper = styled.div`
	width: 100%;
	height: ${MENU_HEIGHT_PX}px;
	background-color: #888888;
`;

const MenuDiv = styled.div`
	height: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
`;

const ContentWrapper = styled.div`
	width: 100%;
	height: calc(100% - ${MENU_HEIGHT_PX}px);
	background-color: #DDD;
`;

export const TemplateBasic:React.FunctionComponent<TemplateBasicProps> = ({
	children
}) => {

	return (
		<RootDiv>
			<MenuWrapper>
				<MenuDiv>
					<div>
						<div>
							여기모아
						</div>
					</div>

					<div>
						<div>
							로그인
						</div>
					</div>
				</MenuDiv>
			</MenuWrapper>
			<ContentWrapper>
				{children}
			</ContentWrapper>
		</RootDiv>
	)
}