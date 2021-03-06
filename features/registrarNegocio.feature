Feature: RegistroNegocio feature
  Como Negocio
  Quiero Registrarme en la pagina
  Para poder vender en la aplicación

  Scenario: Entrar a Registro negocio
    Given I am in the login page
    When I press "Registrar como Negocio"
    Then I should see "¡Registra tu Negocio!" text

Scenario: Registrar con clave corta
    Given I am in the login page
    When I press "Registrar como Negocio"
    And I fill in "email" as "dalexis.da@gmail.com"
    And I fill in "password" as "1234"
    And I fill in "passwordc" as "1234"
    And I fill in "nombre" as "Negocio prueba"
    And I fill in "telefono" as "1234"
    And I Swipe up
    And I press "registerIcon" icon
    Then Id "alertTitle" appears


  Scenario: Registrar con cuenta creada
    Given I am in the login page
    When I press "Registrar como Negocio"
    And I fill in "email" as "dalexis.da@gmail.com"
    And I fill in "password" as "123456"
    And I fill in "passwordc" as "123456"
    And I fill in "nombre" as "Negocio prueba"
    And I fill in "telefono" as "1234"
    And I Swipe up
    And I press "registerIcon" icon
    Then Id "alertTitle" appears