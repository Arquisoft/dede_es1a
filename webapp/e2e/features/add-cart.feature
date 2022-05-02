Feature: Añadir carrito 

Scenario: Usuario logeado añade a carrito
  Given Dado un usuario logeado
  When Añado un producto 
  Then Se ve en el carrito