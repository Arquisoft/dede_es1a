import { act, fireEvent, render } from "@testing-library/react";
import PaymentPage from "../../payment/PaymentPage";
import PaymentPayForm from "../../payment/PaymentPayForm";
import PaymentShipping from "../../payment/PaymentShipping";

act(() => {
    /* fire events that update state */
  })
  
test('PayForm page basics are rendered', ()=> {
    const page = render(
        <PaymentPayForm nextView={() => {} } 
            previusView={() => {} } 
        />);
    
    expect(page.container).toHaveTextContent("Método de pago");
}) 

test('PayForm page btn Volver', ()=> {
    const page = render(
        <PaymentPayForm nextView={() => {} } 
            previusView={() => {} } 
        />);
    expect(page.getByText ("Volver")).toBeDefined();
    expect(page.getByText ("Volver")).toBeEnabled();
})

test('PayForm page btn continuar', ()=> {
    const page = render(
        <PaymentPayForm 
            nextView={() => {} } 
            previusView={() => {} } 
        />);

    expect(page.getByText ("Guardar y Continuar")).toBeDefined();
    expect(page.getByText ("Guardar y Continuar")).toBeDisabled();
})

test('PayForm page btn volver y continuar', ()=> {

    const nextView = jest.fn();
    const previusView = jest.fn();

    const page = render(
        <PaymentPayForm nextView={nextView } 
            previusView={previusView} 
        />);
        
    fireEvent.click(page.getByText ("Guardar y Continuar"));
    expect(nextView).toHaveBeenCalledTimes(0); //Deberia estar desactivado

    fireEvent.click(page.getByText ("Volver"));
    expect(previusView).toHaveBeenCalled();
})