import { applyMiddleware, combineReducers, createStore } from 'redux'

import { user } from '../reducers/user'

const rootReducer = combineReducers({
  user: user,//사용안함 세션스토리지 사용
})

const store = createStore(rootReducer)

export default store