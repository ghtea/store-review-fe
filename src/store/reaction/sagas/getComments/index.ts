import axios, { AxiosResponse } from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { RootState } from '../../../reducers';

import * as actions from '../../actions';
import { GetCommentsData } from './types';
import { Comment } from '../../types';

export const PAGE_SIZE = 5

export function* getComments(action: actions.GET_COMMENTS_Instance) {
  const payload = action.payload

  yield put(
    actions.return__REPLACE({
      keyList: ['getComments', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    const response: AxiosResponse<GetCommentsData> = yield call(
      axios.get,
      `${process.env.REACT_APP_BACKEND_URL}/comment/${payload.reviewId}/${payload.pageNo}`
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['getComments', 'data'],
        replacement: response.data
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['getComments', 'status'],
        replacement: {
          loading: false,
          ready: true,
        },
      }),
    );

    const prevPageNo: number | undefined = yield select(
      (state: RootState) => state.reaction.getComments.pageNo
    );
    yield put(
      actions.return__REPLACE({
        keyList: ['getComments', 'pageNo'],
        replacement: payload.pageNo
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ["getComments", "reviewId"],
        replacement: payload.reviewId
      })
    )

    // check pagination
    // if there are more comment in server, set hasMore to true
    console.log("response.data.data.totalCount: ", response.data.data.totalCount); // TODO: remove
    if ((payload.pageNo + 1) * PAGE_SIZE < response.data.data.totalCount){
      yield put(
        actions.return__REPLACE({
          keyList: ["getComments", "hasMore"],
          replacement: true
        })
      )
    }
    else {
      yield put(
        actions.return__REPLACE({
          keyList: ["getComments", "hasMore"],
          replacement: false
        })
      )
    }

    // merge comments when new page is later one (because of pagination)
    const prevAllComments: Comment[] = yield select(
      (state: RootState) => state.reaction.getComments.allComments
    );

    if (payload.pageNo === 0 ){ // first render
      yield put(
        actions.return__REPLACE({
          keyList: ["getComments", "allComments"],
          replacement: response.data.data.comments || []
        })
      )
    }
    else if (
      (prevPageNo !== undefined && prevPageNo < payload.pageNo) // normal next page
    ){
      yield put(
        actions.return__REPLACE({
          keyList: ["getComments", "allComments"],
          replacement: [...(prevAllComments || []), ...response.data.data.comments]
        })
      )
    }
    // 엉켜서  prevPageNo > payload.pageNo prevPageNo === payload.pageNo 인 경우는 나중에 생각하기

  } catch (error) {
    console.log(error);

    yield put(
      actions.return__REPLACE({
        keyList: ['getComments', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
