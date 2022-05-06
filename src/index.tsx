import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import {persistor, store} from './lib';
import {PersistGate} from 'redux-persist/integration/react';
import {Loading} from './components';

const renderApp = () => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={<Loading full/>}>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </PersistGate>
        </Provider>,
        document.getElementById('root')
    );
};

renderApp();
