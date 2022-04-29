import Orders from '../../Orders';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import { LIST_OF_ORDERS_TEST } from "../code/shared";

test('Check basic content of user Orders', async () => {
    
        const { container } = render(
        <Router> 
            <Orders email={"admin@gmail.com"}/>
            testOrders={LIST_OF_ORDERS_TEST}
        </Router>
        )
        
        expect(container).toHaveTextContent("Nombre")
        expect(container).toHaveTextContent("Tipo")
        expect(container).toHaveTextContent("Fecha")
        expect(container).toHaveTextContent("Precio")    
        
});