Given("I am in the search page") do
  @login_page = page(LoginPage).await(timeout: 30)
  @login_page.login
end

When(/^I search "([^"]*)"$/) do |text|
  touch_icon("searchIcon")
  set_text_input("searchInput", text)
end

When(/^I press "([^"]*)" icon$/) do |id|
  touch_icon("cartIcon")
end

When(/^I press "([^"]*)" for first recipe$/) do |text|
  wait_for_element_exists "* tag:'#{text}'"
  to_touch = query("* tag:'#{text}'")[0]
  touch(to_touch)
end

When(/^I press "([^"]*)" in alert$/) do |text|
  touch_alert_button_by_text(text)
end
