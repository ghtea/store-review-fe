import axios, { AxiosResponse } from "axios";
import { StoreReviewApiResponseData } from "../..";
import { Comment } from "../../../store/reaction";

type updateCommentOptions = Omit<Comment, "created_at" | "updated_at">

export const updateComment = async ({
  id,
  ...rest
}: updateCommentOptions) => {
  const response: AxiosResponse<StoreReviewApiResponseData<Comment>> = 
    await axios.put(`${process.env.REACT_APP_BACKEND_URL}/comment/update/${id}`, rest)

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
export type updateCommentData = Comment & {
}