import { combineReducers } from 'redux'
import { categories } from './categories'
import { credentials } from './credentials'

const rootReducer = combineReducers({
  categories,
  credentials
});

export default rootReducer;