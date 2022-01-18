import axios, { AxiosResponse } from "axios";
import { StoreReviewApiResponseData } from "../..";
import { Comment } from "../../../store/reaction";

type createCommentOptions = Omit<Comment, "id" | "created_at" | "updated_at">

export const createComment = async ({
  ...options
}: createCommentOptions) => {
  const response: AxiosResponse<StoreReviewApiResponseData<Comment>> = 
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/comment/post`, options)

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
export type createCommentData = Comment & {
}