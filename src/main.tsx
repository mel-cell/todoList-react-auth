import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthPage } from './auth/AuthPage.tsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {localStorage.getItem("token") ? <App /> : <AuthPage />}
      <Toaster position="top-center" richColors /> 
  </StrictMode>
)
