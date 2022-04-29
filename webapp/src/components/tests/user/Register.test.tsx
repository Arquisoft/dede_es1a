import { render } from '@testing-library/react';
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";

import Register from '../../Register';

test('Check words of Login', async () => {
    
        const { container } = render(
        <Router> 
            <Register/>
        </Router>
        )
        
        expect(container).toHaveTextContent("Entrar en Sesión")
        expect(container).toHaveTextContent("email")
        expect(container).toHaveTextContent("password")
        expect(container).toHaveTextContent("Iniciar Sesión")    
        expect(container).toHaveTextContent("¿Aún no estás registrado? Regístrate aqui!")    
            
        
});