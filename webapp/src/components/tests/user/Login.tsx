import { render } from '@testing-library/react';

import Login from '../../Login';

test('Ventana Login',async () => {
   const {getAllByText} =  render(
         <Login /> 
    );

    expect(getAllByText("Entrar en Sesión")[0]).toBeInTheDocument();
})