import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { AuthContextProvider } from './store/auth/auth-context';

ReactDOM.render(
    <AuthContextProvider>
        <HashRouter>
            <ScrollToTop>
                <App></App>
            </ScrollToTop>
        </HashRouter>
    </AuthContextProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();