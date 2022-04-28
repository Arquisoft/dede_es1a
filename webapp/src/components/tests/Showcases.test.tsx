import React from 'react'
import {getByText, render,screen } from "@testing-library/react";
import Showcase from '../Showcase';
import { Rock } from '../../shared/shareddtypes';

test('Check that the showcases render properly', async () => {
    const { container } = render(<Showcase  name={"test"} handleAddToCart={function (r: Rock): void {
        throw new Error('Function not implemented.');
    } } search={{
        mohsMin: undefined,
        mohsMax: undefined,
        densityMin: undefined,
        densityMax: undefined,
        priceMin: undefined,
        priceMax: undefined,
        type: undefined,
        nameSubstring: undefined
    }} />);
    
    expect(container).toHaveTextContent(/testtest/)
    expect(container).toHaveTextContent(/122/)
    expect(container).toHaveTextContent(/densidad/)
    expect(container).toHaveTextContent(/asdf/)

});
