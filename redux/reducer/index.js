import { combineReducer } from redux
import { user } from './user'
const Reducers = combineReducer({
  userState:user 
})

export default Reducers


