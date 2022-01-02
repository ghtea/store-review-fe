import React from 'react';
import { TemplateBasic } from '../templates/TemplateBasic';

export type HomeProps = {
}

export const Home:React.FunctionComponent<HomeProps> = () => {
	return (
		<TemplateBasic>
			홈 페이지
		</TemplateBasic>
	)
}