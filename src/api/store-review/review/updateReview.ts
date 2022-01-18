import axios, { AxiosResponse } from "axios";
import { StoreReviewApiResponseData } from "../..";
import { Review } from "../../../store/reaction";

type updateReviewOptions = Omit<Review, "created_at" | "updated_at">

export const updateReview = async ({
  id,
  ...rest
}: updateReviewOptions) => {
  const response: AxiosResponse<StoreReviewApiResponseData<Review>> = 
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/review/update/${id}`, rest)

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
export type updateReviewData = Review & {
}