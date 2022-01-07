import { call, put } from 'redux-saga/effects';
// import history from 'libraries/history';

import axios, { AxiosResponse } from 'axios';

import * as actions from '../actions';

export function* searchPlaces(action: actions.SEARCH_PLACES_Instance) {
  const { payload } = action

  console.log("payload: ", payload); // TODO: remove
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
    
    const response: AxiosResponse<SearchPlacesData, any> = yield call(
      requestSearchPlaces,
      payload.keyword
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['searchedPlaces', 'data'],
        replacement: response.data,
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
const requestSearchPlaces = (keyword: string): Promise<AxiosResponse<SearchPlacesData, any>> => {
  return axios.get(
    "https://openapi.naver.com:8080/v1/search/local.json",
    {
      params: {
        display: "5",
        query: keyword
      },
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID || "",
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET || "",
      }
    },
  );
}

export type SearchPlacesData = {
	"lastBuildDate": string,
	"total": number,
	"start": number,
	"display": number, // max is 5
	"items": 
		{
			"title": string,
			"link": string,
			"category": string,
			"description": string,
			"telephone": string,
			"address": string,
			"roadAddress": string,
			"mapx": string,
			"mapy": string
		}[]
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