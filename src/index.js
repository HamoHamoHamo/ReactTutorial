import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import App from './App';
import Root from "./pages";
// import { AppProvider } from "./store";


ReactDOM.render(
  <BrowserRouter>
    
    <Root />
    
  </BrowserRouter>,
  document.getElementById('root')
);