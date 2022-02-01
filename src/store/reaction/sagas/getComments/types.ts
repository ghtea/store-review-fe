import { Comment, StoreReivewApiResponseData } from "../..";

export type GetCommentsData = StoreReivewApiResponseData<{
  comments: Comment[]
  totalCount: number
}>