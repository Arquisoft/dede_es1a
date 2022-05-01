Feature: Seeing orders history of a user

Scenario: Orders of user "admin"
  Given Registered user admin
  When Log In and click on my profile
  Then I should see my orders