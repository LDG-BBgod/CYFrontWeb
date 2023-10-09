export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'


export const login = (object) => {
  return {
    type: LOGIN,
    payload: object
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
}