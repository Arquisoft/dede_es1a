import Orders from '../../Orders';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from "react-router-dom";
import { LIST_OF_ORDERS_TEST } from "../code/shared";

test('Check basic content of user Orders', async () => {
    
        const { container } = render(
        <Router> 
            <Orders email={"admin@gmail.com"}/>
        </Router>
        )
        
        expect(container).toHaveTextContent("Nombre")
        expect(container).toHaveTextContent("Tipo")
        expect(container).toHaveTextContent("Fecha")
        expect(container).toHaveTextContent("Precio")    
        
});

test('Check user orders', async () => {
    
    const { container } = render(
    <Router> 
        <Orders email={"admin@gmail.com"}
        ordersTest={LIST_OF_ORDERS_TEST}
        />
    </Router>
    )
    
    expect(container).toHaveTextContent("Nombre")
    expect(container).toHaveTextContent("Tipo")
    expect(container).toHaveTextContent("Fecha")
    expect(container).toHaveTextContent("Precio")    

    for (let index = 0; index < LIST_OF_ORDERS_TEST.length; index++) {
        var order = LIST_OF_ORDERS_TEST[index];
        expect(container).toHaveTextContent(order.productName.toString());
        expect(container).toHaveTextContent(order.productType.toString());
        expect(container).toHaveTextContent(order.date.toLocaleString().substring(0, 10));
        expect(container).toHaveTextContent(order.price.toString());
      }
    
});