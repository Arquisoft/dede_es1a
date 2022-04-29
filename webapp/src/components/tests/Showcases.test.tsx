import React from 'react'
import {getByText, render,screen } from "@testing-library/react";
import Showcase from '../Showcase';
import { Rock } from '../../shared/shareddtypes';

test('Check that the showcases render properly', async () => {
    const { container } = render(<Showcase rocks={[{
        "id": "1222",
        "rockId" : "1111",
        "name": "testtest",
        "img": "asdf",
        "price": 122,
        "mohsHardness": 12,
        "density": "densidad",
        "type": "asdf",
        "quantityCart": 12
    }]} name={"test"} handleAddToCart={function (r: Rock): void {
        throw new Error('Function not implemented.');
    } } />);
    
    expect(container).toHaveTextContent(/testtest/)
    expect(container).toHaveTextContent(/122/)
    expect(container).toHaveTextContent(/densidad/)
    expect(container).toHaveTextContent(/asdf/)

});
