import React from 'react'
import ReactDOM from 'react-dom/client'
import './globals.css';
import App from './App.tsx'
import {HashRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store.ts'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
)
