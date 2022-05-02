import React from 'react'
import {render , screen} from "@testing-library/react";
import Welcome from "../Welcome";
import { Rock } from '../../shared/shareddtypes';

test('check that everything is rendering propertly', async () => {
  render(<Welcome handleAddToCart={function (r: Rock): void {
    throw new Error('Function not implemented.');
  } }/>);
  expect(screen.getByAltText("logo")).toBeInTheDocument();
  expect(screen.getByText("Bienvenido a Rock-Shop")).toBeInTheDocument();
});