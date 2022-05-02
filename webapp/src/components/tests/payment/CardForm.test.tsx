import { act, fireEvent, render } from "@testing-library/react";
import CardForm from "../../payment/creditCardForm/CardForm";
import PaymentPage from "../../payment/PaymentPage";
import PaymentPayForm from "../../payment/PaymentPayForm";
import PaymentShipping from "../../payment/PaymentShipping";

act(() => {
    /* fire events that update state */
  })
  
test('cardForm page basics are rendered', ()=> {
    const page = render(
        <CardForm setCardIsValid={() => {} } />);
    
    expect(page.container).toHaveTextContent("Nombre del titular");
    expect(page.container).toHaveTextContent("Numero de tarjeta");
    expect(page.container).toHaveTextContent("Vencimiento MM/AA");
    expect(page.container).toHaveTextContent("CVC");
    expect(page.getByText ("Validar")).toBeDefined();
    expect(page.getByText ("Validar")).toBeEnabled();
}) 
