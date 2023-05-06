import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App';

// Contexto carrito
import { CarritoProvider } from './context/CartContext.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// <React.StrictMode>
  <CarritoProvider>
    <App />
  </CarritoProvider>
//  </React.StrictMode>
);