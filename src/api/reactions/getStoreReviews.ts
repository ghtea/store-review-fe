import axios, { AxiosResponse } from "axios";
import { StoreReviewApiResponseData } from "..";
import { Review } from "../../store/reaction";

type getStoreReviewsOptions = {
  id: string
}

export const getStoreReviews = async ({
  id
}: getStoreReviewsOptions) => {
  const response: AxiosResponse<StoreReviewApiResponseData<Review[]>> = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/review/list/${id}`)

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
