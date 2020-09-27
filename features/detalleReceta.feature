Feature: Detalle receta feature

  Scenario: Como usuario consumidor valido entro a la aplicacion
   Given the app has been launched
   When I enter text "cris.manu.caste7@gmail.com" into field with id "NoResourceEntry-19"
    And I enter text "12345678@#A" into field with id "NoResourceEntry-27"
    And I hide the keyboard
    #And I press "Iniciar sesión"
   #Then I am in

  Scenario: Como usuario consumidor quiero ver el detalle de una receta
    Given the app has been launched
