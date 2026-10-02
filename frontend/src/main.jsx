/**main.jsx es el punto de entrada de nuestra aplicación React. Se encarga de arrancar React y decirle qué componente debe renderizar. */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
