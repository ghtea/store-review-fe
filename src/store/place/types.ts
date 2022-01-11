
export type Place = {
  place_name: string,
  distance: number | undefined,
  place_url: string,
  category_name: string,
  address_name: string,
  road_address_name: string,
  id: string,
  phone: string,
  category_group_code: string,
  category_group_name: string,
  x: number,
  y: number
}

/*
  place_name: "카카오프렌즈 코엑스점",
  distance: "418",
  place_url: "http://place.map.kakao.com/26338954",
  category_name: "가정,생활 > 문구,사무용품 > 디자인문구 > 카카오프렌즈",
  address_name: "서울 강남구 삼성동 159",
  road_address_name: "서울 강남구 영동대로 513",
  id: "26338954",
  phone: "02-6002-1880",
  category_group_code: "",
  category_group_name: "",
  x: "127.05902969025047",
  y: "37.51207412593136"  
*/