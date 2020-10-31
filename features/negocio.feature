Feature: Negocio feature
  Como negocio
  Quiero ver mis recetas creadas
  Para tener un control de las mismas

  Scenario: Ver una lista de recetas
    Given I am in the recipes page
    Then I should see "Mis Recetas" text