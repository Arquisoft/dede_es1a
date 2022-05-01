Feature: Login a user on the web page

Scenario: The user log in
  Given Email and password of a user
  When I click in Iniciar Sesión
  Then I should be redirected to the catalog