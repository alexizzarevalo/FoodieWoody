# Touch icon with testId = id
def touch_icon(id)
  touch("ReactTextView tag:'#{id}'")
end

# Touch any with testId = test_id
def touch_by_test_id(test_id)
  touch query("* tag:'#{test_id}'")
end

# Write text in text input with specified id
def set_text_input(id, text)
  touch("ReactEditText tag:'#{id}'")
  wait_for_keyboard
  enter_text "* tag:'#{id}'", text
end

# Touch alert button by text
def touch_alert_button_by_text(text)
  touch query("AppCompatButton text:'#{text}'")
end

# Touch alert button by position. Order = [...,2, 1]
def touch_alert_button_by_position(position)
  touch query("AppCompatButton id:'button#{position}'")
end
