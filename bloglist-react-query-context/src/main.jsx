import App from './App.jsx'
import { NotificationContextProvider } from './NotificationContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { UserContextProvider } from './UserContext.jsx'

import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <App />
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </StrictMode>
)
