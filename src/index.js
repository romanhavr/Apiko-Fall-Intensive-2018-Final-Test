import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/store';
import * as appOperations from './modules/app/appOperations';

store.subscribe(() => {
    const state = store.getState();
    const json = JSON.stringify(state);

    window.localStorage.setItem('redux', json);
});

class Index extends React.Component {
    componentWillMount() {
        store.dispatch(appOperations.init())
    }

    render() {
        return (
            <Provider store = {store} >
                <BrowserRouter>    
                    <App />
                </BrowserRouter>
            </Provider>
        )
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();