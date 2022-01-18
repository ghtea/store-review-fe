import axios, { AxiosResponse } from "axios";
import { StoreReviewApiResponseData } from "../..";
import { Review } from "../../../store/reaction";

// type createReviewOptions = {
//   place: Review["place"]
//   suid: Review["suid"]
//   said: Review["said"]
//   content: Review["content"]
//   images: Review["images"]
//   stars: Review["stars"]
// }
type createReviewOptions = Omit<Review, "id" | "created_at" | "updated_at">

export const createReview = async ({
  ...options
}: createReviewOptions) => {
  const response: AxiosResponse<StoreReviewApiResponseData<Review>> = 
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/review/post`, options)

  if (!response){
    //
    throw Error()
  }
  else if (response.data.data){
    return response.data.data
  }
  else {
    const errorType = response.data.meta.error_type
    const errorMessage = response.data.meta.error_message
    throw Error()
  }
}

// TODO: not sure yet
export type createReviewData = Review & {
}