import {render } from "@testing-library/react";
import { Rock } from '../../../shared/shareddtypes';
import Showcases from '../../Showcases';
import {LIST_OF_NAMES} from '../../Showcases'

test('Check that the showcases render properly', async () => {
    const { container } = render(<Showcases handleAddToCart={function (r: Rock): void {
        throw new Error('Function not implemented.');
    } } />);
    
    for (let index = 0; index < LIST_OF_NAMES.length; index++) {
        var type=LIST_OF_NAMES[index]
        if(type===undefined)
            type=''
        expect(container).toHaveTextContent(type)
    }


});
