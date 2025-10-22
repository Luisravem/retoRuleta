
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import {ContextProvider} from './context/GlobalContext.jsx'
import './main.css'
import '../normalize.css'

createRoot(document.getElementById('root')).render(
    
   
   <ContextProvider>
       <App />
    </ContextProvider>


  
)
