import { Review, StoreReivewApiResponseData } from "../..";

export type GetReviewsData = StoreReivewApiResponseData<{
  reviewsResponseDtoList: Review[],
  placeAvgStar: number
}>