import React from 'react'
import {getByText, render,screen } from "@testing-library/react";
import Showcase from '../Showcase';

test('Check that the showcases render properly', async () => {
    const { container } = render(<Showcase rocks={[{
        "id":"1222",
        "name": "testtest",
        "img": "asdf",
        "price": 122,
        "mohsHardness":12,
        "density":"densidad",
        "type":"asdf"}]} name={"test"} />);
    
    expect(container).toHaveTextContent(/testtest/)
    expect(container).toHaveTextContent(/122/)
    expect(container).toHaveTextContent(/densidad/)
    expect(container).toHaveTextContent(/asdf/)

});
