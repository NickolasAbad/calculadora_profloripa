import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { inject } from '@vercel/analytics';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  inject()
)
