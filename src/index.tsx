import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import { History, createBrowserHistory } from 'history'
import userReducer from './reducers/UserReducer'

const createRootReducer = (history: History) => combineReducers({
  router: connectRouter(history),
  user: userReducer
})

const history = createBrowserHistory()

const rootReducer = createRootReducer(history)

export type RootState = ReturnType<typeof rootReducer>

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
    )
  )
)

document.title = "SportNotes"

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));
}

renderApp()
store.subscribe(renderApp)
store.subscribe(() => console.log('Store state:', store.getState()))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
