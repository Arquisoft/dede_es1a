import { fireEvent, render } from "@testing-library/react";
import PaymentPage from "../../payment/PaymentPage";
import PaymentPayForm from "../../payment/PaymentPayForm";
import PaymentShipping from "../../payment/PaymentShipping";

test('PayForm page basics are rendered', ()=> {
    const page = render(
        <PaymentPayForm nextView={() => {} } 
            previusView={() => {} } 
        />);
    
    expect(page.container).toHaveTextContent("Direccion de envío");
}) 