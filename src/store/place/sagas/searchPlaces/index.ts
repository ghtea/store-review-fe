import { call, put, select } from 'redux-saga/effects';

import * as actions from '../../actions';
import { RootState } from '../../../reducers';

export function* searchPlaces(action: actions.SEARCH_PLACES_Instance) {
  const payload = action.payload

  const mainMap: kakao.maps.Map | undefined = yield select(
    (state: RootState) => state.place.mainMap
  );

  if (!kakao || !mainMap) return;

  yield put(
    actions.return__REPLACE({
      keyList: ['searchedPlaces', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  yield put(
    actions.return__REPLACE({
      keyList: ['searchedPlaces', 'keyword'],
      replacement: payload.keyword
    }),
  );

  try {
    const places = new kakao.maps.services.Places(mainMap);

    const response: {
      result: Parameters<KakaoKeywordSearchCallback>[0]
      status: Parameters<KakaoKeywordSearchCallback>[1]
      paginations: Parameters<KakaoKeywordSearchCallback>[2]
    } = yield call(
      requestSearchPlaces,
      {
        keyword: payload.keyword,
        places: places
      }
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['searchedPlaces', 'data'],
        replacement: response.result.map(item => ({
          ...item,
          distance: item.distance ? parseFloat(item.distance) : undefined,
          x: parseFloat(item.x || 0),
          y: parseFloat(item.y || 0),
        }))
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
    console.log(error);

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

const requestSearchPlaces = ({
  keyword,
  places,
}: {
  keyword: string
  places: kakao.maps.services.Places
}): Promise<any> => {
  return new Promise((resolve, reject) => {
    const callback: KakaoKeywordSearchCallback = (result, status, paginations) => {
      if (
        status === kakao.maps.services.Status.OK || 
        status === kakao.maps.services.Status.ZERO_RESULT
        ) {
        resolve({
          result,
          status,
          paginations,
        });
      }
      else {
        reject({
          result,
          status,
          paginations,
        })
      }
    };

    places.keywordSearch(keyword, callback, {
      category_group_code: "FD6" // 음식점  https://apis.map.kakao.com/web/documentation/#CategoryCode
    });
  });
}

type KakaoKeywordSearchCallback = Parameters<kakao.maps.services.Places["keywordSearch"]>[1]