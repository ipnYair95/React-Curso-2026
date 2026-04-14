import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import { ProfessionalApp } from './09-useContext/ProfessionalApp'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Toaster />

        <ProfessionalApp />
        
    </StrictMode>
)
