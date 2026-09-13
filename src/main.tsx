import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Global styles first, so component CSS modules always layer on top of them.
import './styles/global.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
