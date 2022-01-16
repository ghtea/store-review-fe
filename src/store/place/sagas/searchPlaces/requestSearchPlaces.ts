export const requestSearchPlaces = ({
  keyword,
  options,
  places,
}: {
  keyword: string
  options?: KakaoKeywordSearchOptions
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
      category_group_code: "FD6", // 음식점  https://apis.map.kakao.com/web/documentation/#CategoryCode
      ...(options || {})
    });
  });
}

export type KakaoKeywordSearchCallback = Parameters<kakao.maps.services.Places["keywordSearch"]>[1]
export type KakaoKeywordSearchOptions = Parameters<kakao.maps.services.Places["keywordSearch"]>[2]