import { act, fireEvent, render } from "@testing-library/react";
import CardForm from "../../payment/creditCardForm/CardForm";
import PaymentListItems from "../../payment/PaymentListItems";
import PaymentPage from "../../payment/PaymentPage";
import PaymentPayForm from "../../payment/PaymentPayForm";
import PaymentShipping from "../../payment/PaymentShipping";
import { LIST_OF_ROCKS_TEST } from "../code/shared";

test('PaymentListItems basics are rendered', ()=> {
    
    const rock = LIST_OF_ROCKS_TEST[1];
    const page = render(
        <PaymentListItems cartContent={[rock]} nextView={() => {} } previusView={() => {} } handlePay={() => {} }  />);
    
    expect(page.container).toHaveTextContent("Articulos");

    expect(page.container).toHaveTextContent("Precio (€/Ud)");
    expect(page.container).toHaveTextContent("Unidades");
    expect(page.container).toHaveTextContent("Precio Total");

    expect(page.container).toHaveTextContent(rock.name);
    expect(page.container).toHaveTextContent(rock.price+" €");
    expect(page.container).toHaveTextContent(rock.quantityCart+"");
    expect(page.container).toHaveTextContent(rock.price*rock.quantityCart+" €");

    expect(page.getByText ("Volver")).toBeDefined();
    expect(page.getByText ("Volver")).toBeEnabled();

    expect(page.getByText ("Completar Pago")).toBeDefined();
    expect(page.getByText ("Completar Pago")).toBeEnabled();
}) 

test('PaymentListItems with no articles to buy', ()=> {
    
    const page = render(
        <PaymentListItems cartContent={[]} nextView={() => {} } previusView={() => {} } handlePay={() => {} }  />);
    
    expect(page.container).toHaveTextContent("Articulos");
    expect(page.container).toHaveTextContent("No se puede completar la compra:");
    expect(page.container).toHaveTextContent("No hay articulos en el pedido");

    expect(page.getByText ("Pagina principal")).toBeDefined();
    expect(page.getByText ("Pagina principal")).toBeEnabled();
}) 


test('PaymentListItems page btn volver y continuar', ()=> {

    const nextView = jest.fn();
    const previusView = jest.fn();
    const handlePay = jest.fn();

    const rock = LIST_OF_ROCKS_TEST[1];

    const page = render(
        <PaymentListItems cartContent={[rock]} 
            nextView={nextView } 
            previusView={previusView} 
            handlePay={handlePay}  />);
    
        
    fireEvent.click(page.getByText ("Completar Pago"));
    expect(nextView).toHaveBeenCalled();
    expect(handlePay).toHaveBeenCalled();

    fireEvent.click(page.getByText ("Volver"));
    expect(previusView).toHaveBeenCalled();
})