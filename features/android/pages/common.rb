def touch_icon(id)
  touch("ReactTextView tag:'#{id}'")
end

def set_text_input(id, text)
  touch("ReactEditText tag:'#{id}'")
  wait_for_keyboard
  enter_text "* tag:'#{id}'", text
end
