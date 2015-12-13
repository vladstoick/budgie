import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';
import { reducer as formReducer } from 'redux-form';

import user from './user';

export default combineReducers({
  router: routerStateReducer,
  form: formReducer,
  user: user,
});
