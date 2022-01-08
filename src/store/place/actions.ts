export const REPLACE = 'place/REPLACE';
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

export const SEARCH_PLACES = 'place/SEARCH_PLACES';
type SEARCH_PLACES__Payload = {
  keyword: string
};
export const return__SEARCH_PLACES = (payload: SEARCH_PLACES__Payload) => {
  return {
    type: SEARCH_PLACES,
    payload: payload,
  };
};
export type SEARCH_PLACES_Instance = ReturnType<typeof return__SEARCH_PLACES>;
