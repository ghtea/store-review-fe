import React from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';

export type HomePageProps = {
}

export const HomePage: React.FunctionComponent<HomePageProps> = () => {
	return (
		<TemplateBasic>
			홈 페이지
		</TemplateBasic>
	)
}