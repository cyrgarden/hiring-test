import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//Imports for redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import ForListReducer from './Reducers/ForListReducer';

//Creating a store
const Store = createStore(ForListReducer);

//The following line was needed to make it work with tsx ? 
export type RootState = ReturnType<typeof Store.getState>


ReactDOM.render(
  <React.StrictMode>
  <Provider store={Store}>
    <App />,
  </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
