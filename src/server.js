import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router'
import { App } from './components/app.component';
import { createStore,applyMiddleware,compose } from 'redux'
import reducers from './reducers';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {getUserListAction} from "./actions/users.action";
import {serverHelper,renderAsync} from 'redux-async-render';
import promiseMiddleware from 'redux-promise';
const app = new Express();
const server = new Server(app);
import asyncAwait from 'redux-async-await';
// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));
function cacheControl(req, res, next) {
    // instruct browser to revalidate in 60 seconds
    res.header('Cache-Control', 'max-age=1');
    next();
}
app.use('/static', cacheControl, Express.static(path.join(__dirname, 'static'), { maxAge: 1 }));
// universal routing and rendering

const finalCreateStore = compose(
    serverHelper
)(createStore);
export default function configureStore(initialState) {
    return finalCreateStore(reducers, initialState);
}

const html = `
<html>
  <head>
    <title>React-Redux Universal</title>
     <base href="/static/" />
    <link rel="stylesheet" href="assets/styles/main.css">
  </head>
  <body>
    <div id="root"><!-- CONTENT --></div>
  </body>
  <script>
    window.initialStoreData = "-- STORES --";
  </script>
  <script src="js/bundle.js"></script>
</html>
`;


function handleRender(req, res,next) {
    const context = {};

    const middleware = [ thunk,promiseMiddleware,asyncAwait ];
    const store = configureStore(applyMiddleware(...middleware));
    store.dispatch(getUserListAction());
    const renderFn = () => renderToString(
        <Provider store={store}>
            <Router location={req.url} context={context}>
                <App />
            </Router>
        </Provider>
    );

    const state = store.getState();
    setTimeout(function () {
        renderAsync(store, renderFn).then(rendered => {
            res.status(200).send(
                html

                    .replace('<!-- CONTENT -->', rendered)
                    .replace('"-- STORES --"', JSON.stringify(state))
            );
        }).catch(next);
        //TODO: What we have to do for async dispatch?
    },500);
}

app.use(handleRender);

// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});
