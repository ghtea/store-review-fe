import React, { useCallback } from 'react';
import { Rating as OriginalRating } from 'react-simple-star-rating';

// https://github.com/awran5/react-simple-star-rating#available-props
export type RatingProps = React.ComponentProps<typeof OriginalRating> & {
  
}

export const Rating:React.FunctionComponent<RatingProps> = ({
  onClick,
  ...rest
}) => {
  const handleClick = useCallback((value: number)=>{
    onClick?.(value * (5/100))
  },[onClick])

  return (
    <OriginalRating 
      allowHalfIcon={false}
      onClick={handleClick}
      {...rest}
    />
  )
}