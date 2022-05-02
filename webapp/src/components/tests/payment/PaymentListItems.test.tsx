import { fireEvent, render } from "@testing-library/react";
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

    expect(page.getByText ("Completar pago")).toBeDefined();
    expect(page.getByText ("Completar pago")).toBeEnabled();
}) 