import { call, put } from 'redux-saga/effects';

import axios, { AxiosResponse } from 'axios';

import * as actions from '../../actions';
import { DUMMY_DATA } from './DUMMY_DATA';

export function* searchPlaces(action: actions.SEARCH_PLACES_Instance) {
  const { payload } = action

  yield put(
    actions.return__REPLACE({
      keyList: ['searchedPlaces', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    
    // TODO: uncommnet when backend is ready
    // const response: AxiosResponse<SearchPlacesData, any> = yield call(
    //   requestSearchPlaces,
    //   payload.keyword
    // );
    const response: AxiosResponse<SearchPlacesResponseData, any> = yield call(
      requestDummySearchPlaces,
      payload.keyword,
      true, // to throw errror, pass false
    );
    console.log("response", response); // TODO: remove

    yield put(
      actions.return__REPLACE({
        keyList: ['searchedPlaces', 'data'],
        replacement: response.data.data,
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['searchedPlaces', 'status'],
        replacement: {
          loading: false,
          ready: true,
        },
      }),
    );
  } catch (error) {
    console.error(error);

    // yield put(
    //   actions.notification.return__ADD_DELETE_BANNER({
    //     situationCode: 'GetQuizList_UnknownError__E',
    //   }),
    // );

    yield put(
      actions.return__REPLACE({
        keyList: ['searchedPlaces', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
  }
}

// TODO: we should use backend to call api
// const requestSearchPlaces = (keyword: string): Promise<AxiosResponse<SearchPlacesData, any>> => {
//   return axios.get(
//     "https://openapi.naver.com:8080/v1/search/local.json",
//     {
//       params: {
//         display: "5",
//         query: keyword
//       },
//       headers: {
//         "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID || "",
//         "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET || "",
//       }
//     },
//   );
// }

const requestSearchPlaces = (keyword: string): Promise<AxiosResponse<SearchPlacesResponseData, any>> => {
  return axios.get(
    process.env.REACT_APP_BACKEND_URL || "" + "/home/search",
    {
      params: {
        display: "5",
        query: keyword
      }
    },
  );
}

export type SearchPlacesResponseData = {
  meta: {
    code : number 
  },
  data: {
    lastBuildDate: string
    total: number
    start: number
    display: number // max is 5
    items: 
      {
        title: string
        link: string
        category: string
        description: string
        telephone: string
        address: string
        roadAddress: string
        mapx: string
        mapy: string
      }[]
  }
}

// TODO: test
const requestDummySearchPlaces = (keyword: string, shouldSuccess: boolean): Promise<AxiosResponse<SearchPlacesResponseData, any>> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldSuccess){
        resolve(
          {
            data: { 
              meta : {
              code : 200, 
              },
              data: DUMMY_DATA,
            },
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
            request: {}
          }
        )
      }
      else {
        reject({
          response: {
            data: { 
              meta : {
                  code : 599,
                    error_type : "SYSTEM ERROR", 
                    error_message : "시스템 오류."
              }
             }
          }
          })
      }
    }, 2000);
  });
}

// {
//   "title": "호야<b>초밥</b>참치 본점",
//   "link": "",
//   "category": "일식>초밥,롤",
//   "description": "",
//   "telephone": "",
//   "address": "서울특별시 광진구 화양동 10-1 1층",
//   "roadAddress": "서울특별시 광진구 능동로13길 39 1층",
//   "mapx": "317995",
//   "mapy": "549494"
// }[]

