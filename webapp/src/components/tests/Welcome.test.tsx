import React from 'react'
import {render , screen} from "@testing-library/react";
import Welcome from "../Welcome";

test('check that everything is rendering propertly', async () => {
  render(<Welcome/>);
  expect(screen.getByAltText("logo")).toBeInTheDocument();
});