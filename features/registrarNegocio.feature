Feature: RegistroNegocio feature

  Scenario: Como usuario quiero crear una cuenta en la app
    When I press "Registrar Negocio"
    Then I see "¡Registrate tu Negocio!"
