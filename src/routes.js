import React from 'react';
import { Route } from 'react-router';
import { App, Login, Payments } from 'containers';
import { loadToken } from './redux/modules/user';

export default (store) => {
  const checkToken = () => {
    if (!(store.getState().user.token)) {
      store.dispatch(loadToken());
    }
  };

  const requireLogin = (nextState, replaceState) => {
    const token = store.getState().user.token;
    if (!token) {
      replaceState(null, '/login');
    }
  };

  const requireLogout = (nextState, replaceState) => {
    const token = store.getState().user.token;
    if (token) {
      replaceState(null, '/payments');
    }
  };
  return (
    <Route path="/" component={App} onEnter={checkToken}>
      <Route path="login" component={Login} onEnter={requireLogout}/>
      <Route onEnter={requireLogin}>
        <Route path="payments" component={Payments}/>
      </Route>
    </Route>
  );
};
