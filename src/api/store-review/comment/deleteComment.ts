import axios, { AxiosResponse } from "axios";
import { StoreReviewApiResponseData } from "../..";
import { Comment } from "../../../store/reaction";

type deleteCommentOptions = {
  id: number
}

export const deleteComment = async ({
  id
}: deleteCommentOptions) => {
  const response: AxiosResponse<StoreReviewApiResponseData<Comment>> = 
    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/comment/delete/${id}`)

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
export type deleteCommentData = Comment & {
}