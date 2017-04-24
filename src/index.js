import React from 'react';
import ReduxThunk from 'redux-thunk'
import { createStore,applyMiddleware } from 'redux'
import reducers from './reducers/index'
import {getUserListAction} from './actions/users.action';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './components/app.component';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';

import asyncAwait from 'redux-async-await';

const AppClient = () => (
    <Router>
        <App />
    </Router>
);

window.onload = () => {
    const middleware = [ ReduxThunk ];
    let store = createStore(reducers,applyMiddleware(...middleware));
    //let store = applyMiddleware(asyncAwait)(createStore)(...middleware);

    store.dispatch(getUserListAction());

    ReactDOM.render(
        <Provider store={store}>
            <AppClient />
        </Provider>,
        document.getElementById('root')
    );
};