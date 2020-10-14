Given("I am in the search page") do
  @current_page = page(SearchPage).await(timeout: 30)
end

When("I search {string}") do |text|
  @current_page.search(text)
end

When("I press {string} icon") do |id|
  touch_icon(id)
end

When("I press {string} for first recipe") do |text|
  wait_for_element_exists "* tag:'#{text}'"
  to_touch = query("* tag:'#{text}'")[0]
  touch(to_touch)
end

When("I press {string} in alert") do |text|
  wait_for_element_exists "* text:'#{text}'"
  touch_alert_button_by_text(text)
end
