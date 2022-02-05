
export type Review = {
  reviewId: number
  said: string
  userId: string
  stars: number
  content: string
  createdAt: Date
  updatedAt: Date
  imgUrl: string[]
  isDelete: number
}

export type Comment = {
  commentId: number
  said: string
  userId: string // email of said
  content: string
  createdAt: string
  updatedAt: string
}

export type StoreReivewApiResponseData<Data> = {
  meta: {
    statusCode: number
    errorType?: string
    errorMsg?: string
  },
  data: Data
}