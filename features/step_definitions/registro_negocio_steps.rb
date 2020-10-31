# registro de negocio
Given(/^I am in the registroNegocio page$/) do
  @current_page = page(RegistroNegocioPage).await(timeout: 30)
end

Then(/^Id "(.*?)" appears$/) do |id|
  wait_for_element_exists ("* id:'#{id}'")
  check_element_exists "* id:'#{id}'"
end

Then(/^I Swipe up$/) do
  pan_up()
end

When(/^I press the button "(.*?)"$/) do |testId|
  touch_by_test_id testId
end
