// import './index.css';
// import App from './App';
// import { unregister } from './registerServiceWorker';
// import store from './store';
// import { Provider } from 'react-redux';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { unregister } from './registerServiceWorker';
import store from './store';
import { Provider } from 'react-redux';
// import Bootstrap from 'bootstrap/dist/css/bootstrap.css'
// import Popup from 'react-popup';



ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
unregister();
