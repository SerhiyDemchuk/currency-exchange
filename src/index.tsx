import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ToggleTheme from './styles/theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { currencySlice } from './redux/reducers/currencySlice';

const getTodosFromLocalStorage = () => {
    try {
        const persistedState = localStorage.getItem('reduxState');
        if (persistedState) {
            return JSON.parse(persistedState);
        }
    }
    catch (e) {
        console.log(e);
    }
}

const todos = getTodosFromLocalStorage();
if (todos) {
    store.dispatch(currencySlice.actions.hydrate(todos));
}

ReactDOM.render(
    <React.StrictMode>
        <ToggleTheme>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </ToggleTheme>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
