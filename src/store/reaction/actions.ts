export const REPLACE = 'reaction/REPLACE';
type REPLACE_Payload = {
  keyList: (string | number)[];
  replacement: unknown;
}
export const return__REPLACE = (payload: REPLACE_Payload) => {
  return {
    type: REPLACE,
    payload: payload,
  };
};
export type REPLACE__Instance = ReturnType<typeof return__REPLACE>;

// comments
export const GET_COMMENTS = 'reaction/GET_COMMENTS';
type GET_COMMENTS__Payload = {
  reviewId: number
  pageNo: number
};
export const return__GET_COMMENTS = (payload: GET_COMMENTS__Payload) => {
  return {
    type: GET_COMMENTS,
    payload: payload,
  };
};
export type GET_COMMENTS_Instance = ReturnType<typeof return__GET_COMMENTS>;

export const POST_COMMENT = 'reaction/POST_COMMENT';
type POST_COMMENT__Payload = {
  reviewId: number
  content: string
};
export const return__POST_COMMENT = (payload: POST_COMMENT__Payload) => {
  return {
    type: POST_COMMENT,
    payload: payload,
  };
};
export type POST_COMMENT_Instance = ReturnType<typeof return__POST_COMMENT>;

export const PUT_COMMENT = 'reaction/PUT_COMMENT';
type PUT_COMMENT__Payload = {
  commentId: number
  content: string
};
export const return__PUT_COMMENT = (payload: PUT_COMMENT__Payload) => {
  return {
    type: PUT_COMMENT,
    payload: payload,
  };
};
export type PUT_COMMENT_Instance = ReturnType<typeof return__PUT_COMMENT>;

export const DELETE_COMMENT = 'reaction/DELETE_COMMENT';
type DELETE_COMMENT__Payload = {
  commentId: number
};
export const return__DELETE_COMMENT = (payload: DELETE_COMMENT__Payload) => {
  return {
    type: DELETE_COMMENT,
    payload: payload,
  };
};
export type DELETE_COMMENT_Instance = ReturnType<typeof return__DELETE_COMMENT>;

// reviews
export const GET_REVIEWS = 'reaction/GET_REVIEWS';
type GET_REVIEWS__Payload = {
  placeId: string
};
export const return__GET_REVIEWS = (payload: GET_REVIEWS__Payload) => {
  return {
    type: GET_REVIEWS,
    payload: payload,
  };
};
export type GET_REVIEWS_Instance = ReturnType<typeof return__GET_REVIEWS>;

export const GET_REVIEW = 'reaction/GET_REVIEW';
type GET_REVIEW__Payload = {
  reviewId: number
};
export const return__GET_REVIEW = (payload: GET_REVIEW__Payload) => {
  return {
    type: GET_REVIEW,
    payload: payload,
  };
};
export type GET_REVIEW_Instance = ReturnType<typeof return__GET_REVIEW>;

export const POST_REVIEW = 'reaction/POST_REVIEW';
type POST_REVIEW__Payload = {
  placeId: string
  content: string
  stars: number
  imgFileList: File[]
};
export const return__POST_REVIEW = (payload: POST_REVIEW__Payload) => {
  return {
    type: POST_REVIEW,
    payload: payload,
  };
};
export type POST_REVIEW_Instance = ReturnType<typeof return__POST_REVIEW>;

export const PUT_REVIEW = 'reaction/PUT_REVIEW';
type PUT_REVIEW__Payload = {
  reviewId: number
  content: string
  stars: number
  serverImgUrl: string[]
  imgFileList?: File[]
};
export const return__PUT_REVIEW = (payload: PUT_REVIEW__Payload) => {
  return {
    type: PUT_REVIEW,
    payload: payload,
  };
};
export type PUT_REVIEW_Instance = ReturnType<typeof return__PUT_REVIEW>;

export const DELETE_REVIEW = 'reaction/DELETE_REVIEW';
type DELETE_REVIEW__Payload = {
  reviewId: number
};
export const return__DELETE_REVIEW = (payload: DELETE_REVIEW__Payload) => {
  return {
    type: DELETE_REVIEW,
    payload: payload,
  };
};
export type DELETE_REVIEW_Instance = ReturnType<typeof return__DELETE_REVIEW>;
