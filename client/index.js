import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import 'semantic-ui-css/semantic.min.css';

import App from './components/App';

const store = createStore(
    (state = {}) => state,
    applyMiddleware(thunk)
)

render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('app')
);