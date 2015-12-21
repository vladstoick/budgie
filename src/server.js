import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import Html from './helpers/Html';
import http from 'http';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import url from 'url';
import reactCookie from 'react-cookie';
import cookieParser from 'cookie-parser';

import {ReduxRouter} from 'redux-router';
import createHistory from 'history/lib/createMemoryHistory';
import {reduxReactRouter, match} from 'redux-router/server';
import {Provider} from 'react-redux';
import qs from 'query-string';
import getRoutes from './routes';
import getStatusFromRoutes from './helpers/getStatusFromRoutes';
import ApiClient from './helpers/ApiClient';

import * as userActions from './redux/modules/user';

const app = new Express();
const server = new http.Server(app);

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(compression());
app.use(cookieParser());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

const proxy = httpProxy.createProxyServer({
  target: config.apiHost,
  changeOrigin: true,
});

app.use('/api', (req, res) => {
  proxy.web(req, res);
});

const wrap = fn => (...args) => fn(...args).catch(args[2]);
app.post('/loginjs', wrap(async (req, res) => {
  reactCookie.plugToRequest(req, res);
  try {
    const apiClient = new ApiClient();
    const data = await apiClient.login(req.body);
    reactCookie.save('token', data.token);
    res.redirect('/');
  } catch (error) {
    res.redirect('/login?error=' + error.message);
  }
}));

app.use((req, res) => {
  reactCookie.plugToRequest(req, res);
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }

  const store = createStore(reduxReactRouter, getRoutes, createHistory);

  // handle login errors
  if (url.parse(req.url).pathname === '/login' && req.query.error) {
    store.dispatch(userActions.logInErrored(req.query.error));
  }

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  store.dispatch(match(req.originalUrl, (error, redirectLocation, routerState) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', pretty.render(error));
      res.status(500);
      hydrateOnClient();
    } else if (!routerState) {
      res.status(500);
      hydrateOnClient();
    } else {
      // Workaround redux-router query string issue:
      // https://github.com/rackt/redux-router/issues/106
      if (routerState.location.search && !routerState.location.query) {
        routerState.location.query = qs.parse(routerState.location.search);
      }

      store.getState().router.then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxRouter/>
          </Provider>
        );

        const status = getStatusFromRoutes(routerState.routes);
        if (status) {
          res.status(status);
        }
        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      }).catch((err) => {
        console.error('DATA FETCHING ERROR:', pretty.render(err));
        res.status(500);
        hydrateOnClient();
      });
    }
  }));
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
