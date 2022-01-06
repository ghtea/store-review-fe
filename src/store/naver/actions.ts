export const REPLACE = 'naver/REPLACE';
type REPLACE_Payload = {
  keyList: (string | number)[];
  replacement: unknown;
}
export const return__REPLACE = (payload: REPLACE_Payload) => {
  return {
    type: REPLACE,
    payload: payload,
  };
};
export type REPLACE__Instance = ReturnType<typeof return__REPLACE>;

export const SEARCH_PLACE = 'quiz/SEARCH_PLACE';
type SEARCH_PLACE__Payload = {
  keyword: string
};
export const return__SEARCH_PLACE = (payload: SEARCH_PLACE__Payload) => {
  return {
    type: SEARCH_PLACE,
    payload: payload,
  };
};
export type SEARCH_PLACE_Instance = ReturnType<typeof return__SEARCH_PLACE>;
