import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Keeping explicit extension
import './index.css'; // Keeping explicit extension

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
