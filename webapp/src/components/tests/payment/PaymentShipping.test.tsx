import { fireEvent, render } from "@testing-library/react";
import PaymentPage from "../../payment/PaymentPage";
import PaymentShipping from "../../payment/PaymentShipping";

test('Shipping page basics are rendered', ()=> {
    const page = render(
        <PaymentShipping nextView={() => {} } 
            previusView={() => {} } 
            setLoggedPod={() => {} } 
            isLoggedPod={false}
        />);
    
    expect(page.container).toHaveTextContent("Direccion de envío");
}) 

test('btn Login', ()=> {
    const page = render(
        <PaymentShipping nextView={() => {} } 
            previusView={() => {} } 
            setLoggedPod={() => {} } 
            isLoggedPod={false}
        />);
    
    expect(page.getByText ("Login")).toBeDefined();
    expect(page.getByText ("Login")).toBeEnabled();
})

test('btn Volver', ()=> {
    const page = render(
        <PaymentShipping nextView={() => {} } 
            previusView={() => {} } 
            setLoggedPod={() => {} } 
            isLoggedPod={false}
        />);
    expect(page.getByText ("Volver")).toBeDefined();
    expect(page.getByText ("Volver")).toBeEnabled();
})

test('btn guardar no logueado', ()=> {
    const page = render(
        <PaymentShipping nextView={() => {} } 
            previusView={() => {} } 
            setLoggedPod={() => {} } 
            isLoggedPod={false}
        />);

    expect(page.getByText ("Guardar y Continuar")).toBeDefined();
    expect(page.getByText ("Guardar y Continuar")).toBeDisabled();
})

test('btn guardar si logueado', ()=> {
    const page = render(
        <PaymentShipping nextView={() => {} } 
            previusView={() => {} } 
            setLoggedPod={() => {} } 
            isLoggedPod={true}
        />);

    expect(page.getByText ("Guardar y Continuar")).toBeDefined();
    expect(page.getByText ("Guardar y Continuar")).toBeEnabled();
})


test('btn volver y continuar', ()=> {

    const nextView = jest.fn();
    const previusView = jest.fn();

    const page = render(
        <PaymentShipping nextView={nextView } 
            previusView={previusView} 
            setLoggedPod={() => {} } 
            isLoggedPod={true}
        />);
        
    fireEvent.click(page.getByText ("Guardar y Continuar"));
    expect(nextView).toHaveBeenCalled();

    fireEvent.click(page.getByText ("Volver"));
    expect(previusView).toHaveBeenCalled();
})