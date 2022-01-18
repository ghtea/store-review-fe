
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
  id: number
  // TODO: add name of author
  suid: string
  said: string
  content: string
  created_at: Date
  updated_at: Date
  review: number
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
  id: 164388,
  // TODO: add name of author
  suid: "string",
  said: "string",
  content: "cccc comment",
  created_at: new Date(),
  updated_at: new Date(),
  review: 13563667,
}