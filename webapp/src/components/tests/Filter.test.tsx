import { render } from "@testing-library/react";
import { Rock } from "../../shared/shareddtypes";
import Catalog from "../Catalog";
import { BrowserRouter as Router } from "react-router-dom";
import { LIST_OF_ROCKS_TEST } from "./code/shared";
test("Check that the filter from the catalog renders properly", async () => {
  const { container } = render(
    <Router>
      <Catalog
        handleAddToCart={function (rock: Rock): void {
          throw new Error("Function not implemented.");
        }}
        testRocks={[]}
      />
    </Router>
  );

  expect(container).toHaveTextContent("Mohs010");
  expect(container).toHaveTextContent("Densidad0100");
  expect(container).toHaveTextContent("Precio0100");
  expect(container).toHaveTextContent("Selecciona el tipo de roca");


});
