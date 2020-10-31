Feature: Negocio feature
    Como negocio
    Quiero ver mis recetas creadas
    Para tener un control de las mismas

    Scenario: Ver una lista de recetas
        Given I am in the recipes page
        Then I should see "Mis Recetas" text

    Scenario: Ir a la pantalla para crear una receta
        Given I am in the recipes page
        And I press "createIcon" icon
        Then I see "Crear receta"

    Scenario: Cerrar sesion para proteger el acceso
        Given I am in the recipes page
        When I logout
        Then I see "Inicia Sesión"