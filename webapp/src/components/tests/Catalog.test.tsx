import { render } from "@testing-library/react";
import { Rock } from "../../shared/shareddtypes";
import Catalog from "../Catalog";
import { BrowserRouter as Router } from "react-router-dom";
import { LIST_OF_ROCKS_TEST } from "./code/shared";
test("Check that the showcases render properly", async () => {
  const { container } = render(
    <Router>
      <Catalog
        handleAddToCart={function (rock: Rock): void {
          throw new Error("Function not implemented.");
        }}
        testRocks={LIST_OF_ROCKS_TEST}
      />
    </Router>
  );

  expect(container).toHaveTextContent("Mohs010");
  expect(container).toHaveTextContent("Mohs010");
  expect(container).toHaveTextContent("Mohs010");
  expect(container).toHaveTextContent("Mohs010");

  for (let index = 0; index < LIST_OF_ROCKS_TEST.length; index++) {
    var rock = LIST_OF_ROCKS_TEST[index];
    expect(container).toHaveTextContent("Nombre: " + rock.name.toString());
    expect(container).toHaveTextContent(
      "Mohs: " + rock.mohsHardness.toString()
    );
    expect(container).toHaveTextContent("Precio: " + rock.price.toString());
    expect(container).toHaveTextContent(
      "Tipo: " +
        rock.type.toString()[0].toUpperCase() +
        rock.type.toString().substring(1, rock.type.toString().length)
    );
  }
  expect(container).toHaveTextContent(/Comprar/);
});
