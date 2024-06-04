// Gerekli importları yapıyoruz.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Uygulamamızı render ediyoruz.
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);