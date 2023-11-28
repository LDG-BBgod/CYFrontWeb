import { applyMiddleware, combineReducers, createStore } from 'redux'

import { user } from '../reducers/user'
import { modal } from '../reducers/modal'

const rootReducer = combineReducers({
  user, //사용안함 세션스토리지 사용
  modal,
})

const store = createStore(rootReducer)

export default store
