import { call, put, select } from 'redux-saga/effects';

import * as actions from '../../actions';
import { KakaoKeywordSearchCallback, requestSearchPlaces } from '../searchPlaces/requestSearchPlaces';

export function* getPageStore(action: actions.GET_PAGE_STORE_Instance) {
  const payload = action.payload

  if (!kakao) return;

  yield put(
    actions.return__REPLACE({
      keyList: ['getPageStore', 'status'],
      replacement: {
        loading: true,
        ready: false,
      },
    }),
  );

  try {
    // https://apis.map.kakao.com/web/documentation/#services_Places
    // map argument is optional but this @types package is wrong
    // @ts-ignore
    const places = new kakao.maps.services.Places(); 

    const response: {
      result: Parameters<KakaoKeywordSearchCallback>[0]
      status: Parameters<KakaoKeywordSearchCallback>[1]
      paginations: Parameters<KakaoKeywordSearchCallback>[2]
    } = yield call(
      requestSearchPlaces,
      {
        keyword: payload.name,
        options: {
          x: payload.longitude,
          y: payload.latitude,
        },
        places: places
      }
    );

    const pagePlace = response.result.find(item => item.id === payload.id)

    if (!pagePlace) throw Error()

    yield put(
      actions.return__REPLACE({
        keyList: ['getPageStore', 'data'],
        replacement: {
          ...pagePlace,
          distance: pagePlace.distance ? parseFloat(pagePlace.distance) : undefined,
          x: parseFloat(pagePlace.x || 0),
          y: parseFloat(pagePlace.y || 0),
        }
      }),
    );

    yield put(
      actions.return__REPLACE({
        keyList: ['getPageStore', 'status'],
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
        keyList: ['getPageStore', 'status'],
        replacement: {
          loading: false,
          ready: false,
        },
      }),
    );
    
  }
}
