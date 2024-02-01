import React from 'react';
import ReactDOM from 'react-dom/client';
import 'core-js/stable/object/has-own';
import App from './app';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(<App />);
