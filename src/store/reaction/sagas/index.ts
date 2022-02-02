import { takeEvery } from "redux-saga/effects";
import * as actions from "../actions"
import { deleteComment } from "./deleteComment";
import { deleteReview } from "./deleteReview";
import { getComments } from "./getComments";
import { getReview } from "./getReview";
import { getReviews } from "./getReviews";
import { postComment } from "./postComment";
import { postReview } from "./postReview";
import { putComment } from "./putComment";
import { putReview } from "./putReview";

export function* reactionSaga() {
  yield takeEvery(actions.GET_COMMENTS, getComments);  
  yield takeEvery(actions.POST_COMMENT, postComment);  
  yield takeEvery(actions.PUT_COMMENT, putComment);  
  yield takeEvery(actions.DELETE_COMMENT, deleteComment);  
  yield takeEvery(actions.GET_REVIEWS, getReviews);  
  yield takeEvery(actions.GET_REVIEW, getReview);  
  yield takeEvery(actions.POST_REVIEW, postReview);  
  yield takeEvery(actions.PUT_REVIEW, putReview);  
  yield takeEvery(actions.DELETE_REVIEW, deleteReview);  
}