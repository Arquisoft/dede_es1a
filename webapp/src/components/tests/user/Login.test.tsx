import { render } from '@testing-library/react';
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";

import Login from '../../Login';

test('Check that the showcases render properly', async () => {
    
        const { container } = render(
        <Router> 
            <Login/>
        </Router>
        )
        
        expect(container).toHaveTextContent("Entrar en Sesión")
        expect(container).toHaveTextContent("email")
        expect(container).toHaveTextContent("password")
        expect(container).toHaveTextContent("Iniciar Sesión")    
            
        
    

});