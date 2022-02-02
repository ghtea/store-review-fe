
export type Review = {
  id: number
  // TODO: add name of author
  suid: string
  said: string
  stars: number
  content: string
  created_at: Date
  updated_at: Date
  images: string[]
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

export const DUMMY_REVIEW: Review = {
  id: 13563667,
  // TODO: add name of author
  suid: "string",
  said: "string",
  stars: 2,
  content: "this is review of of of",
  created_at: new Date(),
  updated_at: new Date(),
  images: ["dfdfdfdf"],
  place: "df4g5rge",
}

export const DUMMY_COMMENT: Comment = {
  commentId: 164388,
  // TODO: add name of author
  said: "string",
  userId: "ddd@ddd.com",
  content: "cccc comment",
  createdAt: "",
  updatedAt: "",
  // review: 13563667,
}

export type StoreReivewApiResponseData<Data> = {
  meta: {
    statusCode: number
    errorType?: string
    errorMsg?: string
  },
  data: {
    data: Data
  }
}