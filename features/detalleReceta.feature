Feature: Detalle receta feature

  Como consumidor
  Quiero ver el detalle de la receta
  Para ver si es el producto que deseo comprar

  Scenario: Como consumidor deseo ver los detalles de una receta que posiblemente compre
   Given I am logged successfully in the app
   When I select the "imageDetails" of the first product on the list
   Then I should see "DetalleReceta"
