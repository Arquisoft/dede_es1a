Feature: Registering a new user

Scenario: The user register in the site
  Given An unregistered user
  When I fill the data in the form and press Regístrate
  Then I should be redirected to Login Page
Scenario: User Register blank email
  Given Name, Dni, Password and confirmPassword of a user
  When I fill the data in the form and press Regístrate
  Then Warning below email
Scenario: User Register blank name
  Given Email, Dni, Password and confirmPassword of a user
  When I fill the data in the form and press Regístrate
  Then Warning below name
Scenario: User Register blank dni
  Given Name, Email, Password and confirmPassword of a user
  When I fill the data in the form and press Regístrate
  Then Warning below dni
Scenario: User Register blank password
  Given Name, Dni, Email and confirmPassword of a user
  When I fill the data in the form and press Regístrate
  Then Warning below Password
Scenario: User Register blank confirmPassword
  Given Name, Dni, Password and Email of a user
  When I fill the data in the form and press Regístrate
  Then Warning below confirmPassword
Scenario: Password and Confirm Password dont match
  Given Email, Name, Dni, Password and confirmPassword of a user
  When I fill the data in the form and press Regístrate
  Then Warning below confirmPassword (Las contraseñas no coinciden)