Given(/^I am in the recipes page$/) do
  @login_page = page(LoginPage).await(timeout: 30)
  @login_page.login("serprodarwin@gmail.com", "123456")
end

When(/^I logout$/) do
  open_drawer
  touch_button_by_text("Cerrar sesión")
end
