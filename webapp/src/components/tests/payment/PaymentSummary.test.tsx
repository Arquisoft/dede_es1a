import { act, fireEvent, render } from "@testing-library/react";
import PaymentSummary from "../../payment/PaymentSummary";
import { LIST_OF_ROCKS_TEST } from "../code/shared";


test('PaymentSummary basics are rendered', ()=> {

    const rock = LIST_OF_ROCKS_TEST[1];
    const page = render(<PaymentSummary cartContent={[rock]} simplificate={false} />);
    
    expect(page.container).toHaveTextContent("Resumen de Pago");
    expect(page.container).toHaveTextContent("Costes (no iva):");
    expect(page.container).toHaveTextContent("Costes (iva 21%):");

    expect(page.container).toHaveTextContent("Costes de Envio:");
    expect(page.container).toHaveTextContent("Total:");
})

test('PaymentSummary basics are rendered', ()=> {

    const rock = LIST_OF_ROCKS_TEST[1];
    const page = render(<PaymentSummary cartContent={[rock]} simplificate={true} />);
    
    expect(page.container).toHaveTextContent("Resumen de Pago");
    expect(page.container).toHaveTextContent("Costes (no iva):");
    expect(page.container).toHaveTextContent("Costes (iva 21%):");
})