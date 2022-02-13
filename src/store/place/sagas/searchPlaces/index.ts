import { call, put, select } from 'redux-saga/effects';

import * as actions from '../../actions';
import { RootState } from '../../../reducers';
import { DEFAULT_COORDS, getCurrentPosition } from '../initMainMap/getCurrentPosition';
import { SagaStatus } from '../../../type';

export function* searchPlaces(action: actions.SEARCH_PLACES_Instance) {
  const payload = action.payload

  const mainMap: kakao.maps.Map | undefined = yield select(
    (state: RootState) => state.place.mainMap
  );

  if (!kakao || !mainMap) return;

  yield put(
    actions.return__REPLACE({
      keyList: ['searchedPlaces', 'status'],
      replacement: SagaStatus.LOADING
    }),
  );

  yield put(
    actions.return__REPLACE({
      keyList: ['searchedPlaces', 'keyword'],
      replacement: payload.keyword
    }),
  );

  let searchLocation = undefined
  if (payload.isCurrentLocation){
    try {
      const currentPosition: GeolocationPosition = yield call(getCurrentPosition);
      searchLocation = new kakao.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude)
    }
    catch (error){
      console.log("getting current location has failed")
    }
    if (!searchLocation) {
      searchLocation = new kakao.maps.LatLng(DEFAULT_COORDS.latitude, DEFAULT_COORDS.longitude)
    }
  }

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
        places: places,
        options: {
          location: searchLocation
        }
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
        replacement: SagaStatus.SUCCESS
      }),
    );
  } catch (error) {
    console.log(error);

    yield put(
      actions.return__REPLACE({
        keyList: ['searchedPlaces', 'status'],
        replacement: SagaStatus.ERROR
      }),
    );
    
  }
}

const requestSearchPlaces = ({
  keyword,
  places,
  options,
}: {
  keyword: string
  places: kakao.maps.services.Places
  options?: KakaoKeywordSearchOption
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
      category_group_code: "FD6", // 음식점  https://apis.map.kakao.com/web/documentation/#CategoryCode,
      ...options
    });
  });
}

export type KakaoKeywordSearchCallback = Parameters<kakao.maps.services.Places["keywordSearch"]>[1]
export type KakaoKeywordSearchOption = Parameters<kakao.maps.services.Places["keywordSearch"]>[2]
