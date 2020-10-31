# Touch icon with testId = id
def touch_icon(id)
  touch("ReactTextView tag:'#{id}'")
end

# Touch any with testId = test_id
def touch_by_test_id(test_id)
  wait_for_element_exists "* tag:'#{test_id}'"
  touch query("* tag:'#{test_id}'")
end

# Write text in text input with specified id
def set_text_input(id, text)
  touch("ReactEditText tag:'#{id}'")
  wait_for_keyboard
  enter_text "* tag:'#{id}'", text
  hide_soft_keyboard
  sleep(1)
end

# Touch alert button by text
def touch_alert_button_by_text(text)
  wait_for_element_exists "* text:'#{text}'"
  touch query("AppCompatButton text:'#{text}'")
end

# Touch alert button by position. Order = [...,2, 1]
def touch_alert_button_by_position(position)
  touch query("AppCompatButton id:'button#{position}'")
end

def touch_button_by_text(text)
  sleep(2)
  tap_when_element_exists "* marked:'#{text}'"
end

def open_drawer()
  #adb shell input swipe 0 500 500 500 50
  pan("* text:'Acerca de Foodie Woody'", :right, from: { x: 0, y: 50 }, to: { x: 500, y: 50 })
  sleep(2)
end
