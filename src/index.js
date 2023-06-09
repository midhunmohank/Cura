import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import './css/main.css';
import './css/bootstrap.min.css';

import App from './App';

// import Header from './components/Header';
// import PostJob from './components/PostJob';
// import bootstrap from './App';
import reportWebVitals from './reportWebVitals';
// import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle';


import {
  // BrowserRouter as Router,
  HashRouter
} from "react-router-dom";


ReactDOM.render(
  // <React.StrictMode>
  <HashRouter>
    <App />
  </HashRouter>
  ,
  // </React.StrictMode>,
  document.getElementById('root')
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
