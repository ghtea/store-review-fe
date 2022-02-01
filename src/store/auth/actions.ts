export const AUTH = 'auth/AUTH';
type AUTH_Payload = {
  authority: string,
  nickname: string
}
export const return__AUTH = (payload: AUTH_Payload) => {
  return {
    type: AUTH,
    payload: payload,
  };
};
export type AUTH__Instance = ReturnType<typeof return__AUTH>;