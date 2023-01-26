import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Store from './context/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Store>
      <App />
    </Store>
  </React.StrictMode>
)
