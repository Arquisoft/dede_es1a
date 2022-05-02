import { render } from "@testing-library/react";
import Showcase, { NUMBER_OF_PRODUCTS_SHOWN } from "../Showcase";
import { Rock } from "../../shared/shareddtypes";
import { LIST_OF_ROCKS_TEST } from "./code/shared";


test("Check that the showcases render properly", async () => {
  const { container } = render(
    <Showcase
      rocks={LIST_OF_ROCKS_TEST}
      handleAddToCart={function (r: Rock): void {
        throw new Error("Function not implemented.");
      }}
      name={""}
      search={{
        mohsMin: undefined,
        mohsMax: undefined,
        densityMin: undefined,
        densityMax: undefined,
        priceMin: undefined,
        priceMax: undefined,
        type: undefined,
        nameSubstring: undefined,
      }}
    />
  );

  for (let index = 0; index < NUMBER_OF_PRODUCTS_SHOWN; index++) {
    var rock = LIST_OF_ROCKS_TEST[index];
    expect(container).toHaveTextContent("Nombre: "+rock.name.toString());
    expect(container).toHaveTextContent("Mohs: "+rock.mohsHardness.toString());
    expect(container).toHaveTextContent("Precio: "+rock.price.toString());
    expect(container).toHaveTextContent("Tipo: "+rock.type.toString()[0].toUpperCase()+rock.type.toString().substring(1,rock.type.toString().length));
  }
});
