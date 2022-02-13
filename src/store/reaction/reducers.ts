import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
import { SagaStatus } from '../type';
import * as actions from './actions';
import { DeleteCommentData } from './sagas/deleteComment/types';
import { DeleteReviewData } from './sagas/deleteReview/types';
import { GetCommentsData } from './sagas/getComments/types';
import { GetReviewData } from './sagas/getReview/types';
import { GetReviewsData } from './sagas/getReviews/types';
import { PostCommentData } from './sagas/postComment/types';
import { PostReviewData } from './sagas/postReview/types';
import { PutCommentData } from './sagas/putComment/types';
import { PutReviewData } from './sagas/putReview/types';
import { Comment } from './types';

export type State = {
  getReviews: {
    data: GetReviewsData | undefined,
    placeId: string | undefined,
    status: SagaStatus
  },
  getReview: {
    data: GetReviewData | undefined,
    status: SagaStatus
  },
  postReview: {
    data: PostReviewData | undefined,
    status: SagaStatus
  },
  putReview: {
    data: PutReviewData | undefined,
    status: SagaStatus
  },
  deleteReview: {
    data: DeleteReviewData | undefined
    status: SagaStatus
  },
  getComments: {
    data: GetCommentsData | undefined
    reviewId: number | undefined
    allComments: Comment[] | undefined
    pageNo: number | undefined
    hasMore: boolean | undefined
    status: SagaStatus
  },
  postComment: {
    data: PostCommentData | undefined
    status: SagaStatus
  },
  putComment: {
    data: PutCommentData | undefined
    status: SagaStatus
  },
  deleteComment: {
    data: DeleteCommentData | undefined
    status: SagaStatus
  },
}

const initialState = {
  getReviews: {
    data: undefined,
    placeId: undefined,
    status: SagaStatus.IDLE
  },
  getReview: {
    data: undefined,
    status: SagaStatus.IDLE
  },
  postReview: {
    data: undefined,
    status: SagaStatus.IDLE
  },
  putReview: {
    data: undefined,
    status: SagaStatus.IDLE
  },
  deleteReview: {
    data: undefined,
    status: SagaStatus.IDLE
  },
  getComments: {
    data: undefined,
    reviewId: undefined,
    allComments: undefined,
    pageNo: undefined,
    hasMore: undefined,
    status: SagaStatus.IDLE
  },
  postComment: {
    data: undefined,
    status: SagaStatus.IDLE
  },
  putComment: {
    data: undefined,
    status: SagaStatus.IDLE
  },
  deleteComment: {
    data: undefined,
    status: SagaStatus.IDLE
  },
};

export const reactionReducer = handleActions<State, any>(
  {
    [actions.REPLACE]: (previousState, action: actions.REPLACE__Instance) => {
      return produce(previousState, (newState) => {
        if (action.payload === undefined) {
          return;
        } else {
          const keyList: (string | number)[] = action.payload.keyList;

          try {
            putValueInNestedObject(newState, keyList, action.payload.replacement);
          } catch {
            return;
          }
        }
      });
    },
  },
  initialState,
);