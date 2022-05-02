
Feature: Log out a user

Scenario: User log in and then Log out
  Given Email and password of a user
  When I click in sign in and the sign out
  Then I should be redirected to the catalog