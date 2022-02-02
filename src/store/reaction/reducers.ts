import { produce } from 'immer';
import { handleActions } from 'redux-actions';
import { putValueInNestedObject } from '../../utils/others/putValueInNestedObject';
import * as actions from './actions';
import { DeleteCommentData } from './sagas/deleteComment/types';
import { GetCommentsData } from './sagas/getComments/types';
import { PostCommentData } from './sagas/postComment/types';
import { PutCommentData } from './sagas/putComment/types';

export type State = {
  getComments: {
    data: GetCommentsData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  postComment: {
    data: PostCommentData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  putComment: {
    data: PutCommentData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
  deleteComment: {
    data: DeleteCommentData | undefined,
    status: {
      loading: boolean,
      ready: boolean,
    }
  },
}

const initialState = {
  getComments: {
    data: undefined,
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