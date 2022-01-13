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

//
export const INIT_MAIN_MAP = 'place/INIT_MAIN_MAP';
export const return__INIT_MAIN_MAP = () => {
  return {
    type: INIT_MAIN_MAP,
  };
};
export type INIT_MAIN_MAP_Instance = ReturnType<typeof return__INIT_MAIN_MAP>;

//
export const MOVE_MAP = 'place/MOVE_MAP';
type MOVE_MAP__Payload = {
  coords?: {
    latitude: number
    longitude: number
  }
  isCurrent?: boolean
};
export const return__MOVE_MAP = (payload: MOVE_MAP__Payload) => {
  return {
    type: MOVE_MAP,
    payload: payload,
  };
};
export type MOVE_MAP_Instance = ReturnType<typeof return__MOVE_MAP>;

//
export const ADD_MARKERS = 'place/ADD_MARKERS';
type ADD_MARKERS__Payload = {
  items: {
    coords: {
      latitude: number
      longitude: number
    }
  }[]
};
export const return__ADD_MARKERS = (payload: ADD_MARKERS__Payload) => {
  return {
    type: ADD_MARKERS,
    payload: payload,
  };
};
export type ADD_MARKERS_Instance = ReturnType<typeof return__ADD_MARKERS>;
