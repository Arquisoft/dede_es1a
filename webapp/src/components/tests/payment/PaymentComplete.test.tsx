import { act, fireEvent, render } from "@testing-library/react";
import PaymentComplete from "../../payment/PaymentComplete";
import PaymentPage from "../../payment/PaymentPage";


test('PaymentComplete basics are rendered', ()=> {
    const page = render(<PaymentComplete nextView={ () => {}}/>);
    
    expect(page.container).toHaveTextContent("Pedido finalizado");
    expect(page.container).toHaveTextContent("¡Tu pedido ya está en camino!");
    expect(page.container).toHaveTextContent("Orden de entrega:");

    
    expect(page.getByText ("Página principal")).toBeDefined();
    expect(page.getByText ("Página principal")).toBeEnabled();
})

test('PaymentComplete page btn volver y continuar', ()=> {
    const nextView = jest.fn();

    const page = render(<PaymentComplete nextView={nextView}/>);
        
    fireEvent.click(page.getByText ("Página principal"));
    expect(nextView).toHaveBeenCalled();

})