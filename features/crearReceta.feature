Feature: Crear Receta Feature

Scenario: Realizo una Receta
    When I enter text "prueba" into field with id "nombre"
    And I enter text "prueba" into field with id "desc"
    And I enter text "prueba" into field with id "ingredientes"
    And I enter text "prueba" into field with id "preparacion"
    And I enter text "prueba" into field with id "total"
    And I press "btnCrear"
    

