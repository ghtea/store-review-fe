import React from 'react';
import { Rating as OriginalRating } from 'react-simple-star-rating';

// https://github.com/awran5/react-simple-star-rating#available-props
export type RatingProps = React.ComponentProps<typeof OriginalRating> & {
  
}

export const Rating:React.FunctionComponent<RatingProps> = ({
  
  ...rest
}) => {

	return (
		<OriginalRating 
      allowHalfIcon={true}
      {...rest}
      />
	)
}