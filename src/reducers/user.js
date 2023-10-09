import { LOGIN, LOGOUT } from '../actions/user'

export const initialState = {
  userType: '',
  userId: '',
  token: '',
}

export const user = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        userType: action.payload.userType,
        userId: action.payload.userId,
        token: action.payload.token,
      }
    case LOGOUT:
      return {
        userType: '',
        userId: '',
        token: '',
      }
    default:
      return state
  }
}
