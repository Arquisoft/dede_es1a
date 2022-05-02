import { fireEvent, render } from "@testing-library/react";
import Cart from "../ShoppingCart";
import { LIST_OF_ROCKS_TEST } from "./code/shared";


    // Cart renders basic structure
    test('cart basics are rendered', ()=> {
        const cartComponent = render(<Cart cartContent={[]} handleAddToCart={() => {}} handleRemoveFromCart={() => {}}/>);
        
        expect(cartComponent.container).toHaveTextContent("Mi carrito");
        expect(cartComponent.container).toHaveTextContent("Unidades:");
        expect(cartComponent.container).toHaveTextContent("Total:");
        expect(cartComponent.container).toHaveTextContent("0.00 €");
        expect(cartComponent.getByText ("Realizar Pedido")).toBeDefined();
    })

    // Cart has products and they are rendered
    test('cart has products and they are rendered', ()=> {
        const rock = LIST_OF_ROCKS_TEST[0];
        const cartComponent = render(<Cart cartContent={[rock]} handleAddToCart={() => {}} handleRemoveFromCart={() => {}}/>)
        
        expect(cartComponent.container).toHaveTextContent(rock.name);
        expect(cartComponent.container).toHaveTextContent(rock.quantityCart+" uds");
        expect(cartComponent.container).toHaveTextContent(rock.price*rock.quantityCart+" €");
        expect(cartComponent.getByText ("+")).toBeEnabled();
        expect(cartComponent.getByText ("-")).toBeEnabled();
        expect(cartComponent.getByText ("Realizar Pedido")).toBeEnabled();
    })

    // Cart hasnt products
    test('cart hasnt products', ()=> {
        const cartComponent = render(<Cart cartContent={[]} handleAddToCart={() => {}} handleRemoveFromCart={() => {}}/>);
        
        expect(cartComponent.container).toHaveTextContent("0.00 €");
        expect(cartComponent.getByText ("Realizar Pedido")).toBeDisabled();
    })

    // button to add or remove ud article
    test('button to add and to remove ud of the cart', ()=> {
        const rock = LIST_OF_ROCKS_TEST[0];

        const handleAddToCart = jest.fn();
        const handleRemoveFromCart = jest.fn();

        const cartComponent = render(<Cart cartContent={[rock]} handleAddToCart={handleAddToCart} handleRemoveFromCart={handleRemoveFromCart}/>)
        
        fireEvent.click(cartComponent.getByText ("+"));
        expect(handleAddToCart).toHaveBeenCalled();

        fireEvent.click(cartComponent.getByText ("-"));
        expect(handleRemoveFromCart).toHaveBeenCalled();
    })