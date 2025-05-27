import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'

import { attachLogger } from "effector-logger";

import App from '@/app/app';

if (import.meta.env.MODE !== 'production') {
  attachLogger();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
