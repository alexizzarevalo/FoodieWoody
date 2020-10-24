Feature: Login feature
  Como usuario
  Quiero iniciar sesión en el sistema
  Para poder usar la aplicación

  Scenario: Iniciar sesión en el sistema correctamente
    Given I am in the login page
    When I fill in "emailInput" as "dalexis.da@gmail.com"
    And I fill in "passwordInput" as "123456"
    And I press button "Iniciar sesión"
    Then I should see "Bienvenido" text
