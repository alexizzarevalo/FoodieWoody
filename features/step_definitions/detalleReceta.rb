Given(/^I am logged successfully in the app$/) do
    @current_page = page(DetalleRecetaPage).await
end

When('I select the {string} of the first product on the list') do |imageDetails|
    @current_page.select_first_item(imageDetails)
end


