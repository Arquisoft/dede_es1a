Feature: Login a user on the web page

Scenario: The user log in
  Given Email and password of a user
  When I click in Iniciar Sesión
  Then I should be redirected to the catalog
Scenario: User log in blank email
  Given Blank Email and password of a user
  When I click in Iniciar Sesión
  Then Warning message below Email
Scenario: User log in blank password
  Given Email and blank password of a user
  When I click in Iniciar Sesión
  Then Warning message below Password