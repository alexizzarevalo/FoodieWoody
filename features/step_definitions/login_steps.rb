Given(/^I am in the login page$/) do
  @current_page = page(LoginPage).await(timeout: 30)
end

When(/^I fill in "(.*?)" as "(.*?)"$/) do |input, text|
  set_text_input input, text
end

When(/^I press button "(.*?)"$/) do |text|
  touch_button_by_text text
end

Then(/^I should see "(.*?)" text$/) do |text|
  wait_for_element_exists "* text:'#{text}'"
  check_element_exists "* text:'#{text}'"
end
