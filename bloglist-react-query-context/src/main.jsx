import App from './App.jsx'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { NotificationContextProvider } from './NotificationContext.jsx'

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </StrictMode>
)
