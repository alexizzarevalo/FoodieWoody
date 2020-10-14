Feature: RegistroNegocio feature
  Como Negocio
  Quiero Registrarme en la pagina
  Para poder vender en la aplicación

  Scenario: Guardar sin datos
    Given I am in the registroNegocio page
    When I press "Registrate"
    Then Id "alertTitle" appears
