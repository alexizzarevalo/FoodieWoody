require "calabash-android/calabash_steps"

Given("I am in the search page") do
  @current_page = page(SearchPage).await(timeout: 30)
end

When("I search {string}") do |text|
  @current_page.search(text)
end
