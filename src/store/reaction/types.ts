
export type Review = {
  id: number
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
  suid: string
  said: string
  content: string
  created_at: Date
  updated_at: Date
  review: number
}