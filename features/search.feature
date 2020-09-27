Feature: Search feature
    Como usuario
    Quiero buscar recetas
    Para filtrar solo lo que me interesa

    Scenario: Buscar una receta
        Given I am in the search page
        When I search "Pizza"
        Then I see "Pizza"

    Scenario: Ir al carrito
        Given I am in the search page
        When I press "cartIcon" icon
        Then I see "Checkout"