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


export const AUTHENTICATE = 'auth/AUTHENTICATE';
type AUTHENTICATE_Payload = {
  token: string,
}
export const return__AUTHENTICATE = (payload: AUTHENTICATE_Payload) => {
  return {
    type: AUTHENTICATE,
    payload: payload,
  };
};
export type AUTHENTICATE__Instance = ReturnType<typeof return__AUTHENTICATE>;

export const LOG_OUT = 'auth/LOG_OUT';
export const return__LOG_OUT = () => {
  return {
    type: LOG_OUT,
  };
};
export type LOG_OUT__Instance = ReturnType<typeof return__LOG_OUT>;