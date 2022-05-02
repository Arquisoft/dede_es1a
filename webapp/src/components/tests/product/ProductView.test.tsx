import {render } from "@testing-library/react";
import { Rock } from '../../../shared/shareddtypes';
import Product from "../../Product";
import ProductView from "../../ProductView";
import {LIST_OF_NAMES} from '../../Showcases'

test('Check that the showcases render properly', async () => {
    const productInfoArr:string[]=["Prueba","PruebaType"]
    const { container } = render(<ProductView product={{
        id:"",
        rockId: "",
        name: productInfoArr[0],
        img: "",
        price: 1,
        mohsHardness: 1,
        density:1,
        type: productInfoArr[1],
        quantityCart: 1
    }}   handleAddToCart={function (r: Rock): void {
        throw new Error('Function not implemented.');
    } }  />);
    
    for (let index = 0; index < productInfoArr.length; index++) {
        var text=productInfoArr[index]
        expect(container).toHaveTextContent(text)
    }


});
