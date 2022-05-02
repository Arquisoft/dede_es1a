import { render } from "@testing-library/react";
import PaymentPage from "../../payment/PaymentPage";



test('cart basics are rendered', ()=> {
    const cartComponent = render(<PaymentPage cartContent={[]} setNewCart={() =>{}}/>);
    
    expect(cartComponent.container).toHaveTextContent("Mi compra");
})