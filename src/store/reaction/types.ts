
export type Review = {
  id: number
  // TODO: add name of author
  suid: string
  said: string
  userId: string
  stars: number
  content: string
  created_at: Date
  updated_at: Date
  imgUrl: string[]
  place: string
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