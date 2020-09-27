Given(/^the app has been launched$/) do

end

When(/^I hide the keyboard$/) do
    query("textField isFirstResponder:1", :resignFirstResponder)
end
