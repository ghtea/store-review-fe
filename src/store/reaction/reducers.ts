import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
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
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  getReview: {
    data: GetReviewData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  postReview: {
    data: PostReviewData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  putReview: {
    data: PutReviewData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  deleteReview: {
    data: DeleteReviewData | undefined
    status: {
      loading: boolean
      ready: boolean
    }
  },
  getComments: {
    data: GetCommentsData | undefined
    reviewId: number | undefined
    allComments: Comment[] | undefined
    pageNo: number | undefined
    hasMore: boolean | undefined
    status: {
      loading: boolean
      ready: boolean
    }
  },
  postComment: {
    data: PostCommentData | undefined
    status: {
      loading: boolean
      ready: boolean
    }
  },
  putComment: {
    data: PutCommentData | undefined
    status: {
      loading: boolean
      ready: boolean
    }
  },
  deleteComment: {
    data: DeleteCommentData | undefined
    status: {
      loading: boolean
      ready: boolean
    }
  },
}

const initialState = {
  getReviews: {
    data: undefined,
    placeId: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  getReview: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  postReview: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  putReview: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  deleteReview: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  getComments: {
    data: undefined,
    reviewId: undefined,
    allComments: undefined,
    pageNo: undefined,
    hasMore: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  postComment: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  putComment: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
  },
  deleteComment: {
    data: undefined,
    status: {
      loading: false,
      ready: true,
    }
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