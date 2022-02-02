import { takeEvery } from "redux-saga/effects";
import * as actions from "../actions"
import { deleteComment } from "./deleteComment";
import { getComments } from "./getComments";
import { postComment } from "./postComment";
import { putComment } from "./putComment";

export function* reactionSaga() {
  yield takeEvery(actions.GET_COMMENTS, getComments);  
  yield takeEvery(actions.POST_COMMENT, postComment);  
  yield takeEvery(actions.PUT_COMMENT, putComment);  
  yield takeEvery(actions.DELETE_COMMENT, deleteComment);  
}