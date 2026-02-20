import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { injectSpeedInsights } from '@vercel/speed-insights';

// initialize Vercel Speed Insights once at startup
const si = injectSpeedInsights({
  debug: import.meta.env.DEV,
});

// if you navigate manually you can update the route via si?.setRoute(pathname)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
