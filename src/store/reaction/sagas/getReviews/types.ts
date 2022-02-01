import { Review, StoreReivewApiResponseData } from "../..";

export type GetReviewsData = StoreReivewApiResponseData<{
  reviews: Review[]
}>