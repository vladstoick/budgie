import React from 'react';
import { Route } from 'react-router';

import { App, Login, Payments } from 'components';
import { loadToken } from './redux/modules/user';


export default (store) => {
  const requireLogin = (nextState, replaceState) => {
    store.dispatch(loadToken());
    const token = store.getState().user.token;
    if (!token) {
      replaceState(null, '/login');
    }
  };

  return (
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route onEnter={requireLogin}>
        <Route path="payments" component={Payments}/>
      </Route>
    </Route>
  );
};
