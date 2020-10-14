Given(/^I am in the login page$/) do
  @current_page = page(LoginPage).await(timeout: 30)
end

When(/^I fill in "(.*?)" as "(.*?)"$/) do |input, text|
  @current_page.fill_in_input(input, text)
end

Then(/^I should see "(.*?)" text$/) do |text|
  wait_for_element_exists "* text:'#{text}'"
  check_element_exists "* text:'#{text}'"
end
