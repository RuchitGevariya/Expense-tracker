import "./i18"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ExpenseProvider } from './Components/Context/ExpenseContext';

import { I18nextProvider } from "react-i18next";
import i18n from "./i18";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <I18nextProvider i18n={i18n}>
  <ExpenseProvider>
  <React.StrictMode>
     <App />
  </React.StrictMode>
  </ExpenseProvider>
  </I18nextProvider>
);
