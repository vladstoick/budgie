import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Login, Payments, FrontPage, CreatePayment } from 'containers';
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

  const requireNotLoggedIn = (nextState, replaceState) => {
    const token = store.getState().user.token;
    if (token) {
      replaceState(null, '/payments');
    }
  };
  return (
    <Route path="/" component={App} onEnter={checkToken}>
      <IndexRoute component={FrontPage} />
      <Route path="login" component={Login} onEnter={requireNotLoggedIn} />
      <Route onEnter={requireLogin}>
        <Route path="payments" component={Payments} />
        <Route path="createPayment" component={CreatePayment} />
      </Route>
    </Route>
  );
};
