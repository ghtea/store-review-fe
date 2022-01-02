import React from 'react';
import { TemplateFull } from '../templates/TemplateFull';

export type ErrorProps = {
}

export const Error:React.FunctionComponent<ErrorProps> = () => {
	return (
		<TemplateFull>
			Error
		</TemplateFull>
	)
}