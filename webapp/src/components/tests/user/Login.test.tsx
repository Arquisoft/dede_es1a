import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Login from '../../Login';

test('Check words of Login', async () => {
    
        const { container } = render(
        <Router> 
            <Login/>
        </Router>
        )
        
        expect(container).toHaveTextContent("Entrar en Sesión")
        expect(container).toHaveTextContent("email")
        expect(container).toHaveTextContent("password")
        expect(container).toHaveTextContent("Iniciar Sesión")    
        expect(container).toHaveTextContent("¿Aún no estás registrado? Regístrate aqui!")    
            
        
});