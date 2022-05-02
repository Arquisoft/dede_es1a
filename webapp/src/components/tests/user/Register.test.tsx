import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";

import Register from '../../Register';

test('Check words of Register', async () => {
    
        const { container } = render(
        <Router> 
            <Register/>
        </Router>
        )
        
        expect(container).toHaveTextContent("Crear cuenta")
        expect(container).toHaveTextContent("Email:")
        expect(container).toHaveTextContent("Name:")
        expect(container).toHaveTextContent("DNI:")
        expect(container).toHaveTextContent("Password:")
        expect(container).toHaveTextContent("Confirm Password:")    
        expect(container).toHaveTextContent("Regístrate") 
        expect(container).toHaveTextContent("¿Ya tienes una cuenta? Inicia sesión aqui!")    
            
        
});