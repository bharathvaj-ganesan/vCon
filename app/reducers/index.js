import { combineReducers } from 'redux';
import videoReducer from './Video';

export default combineReducers({
  videos: videoReducer
});
