require "calabash-android/abase"

class LoginPage < Calabash::ABase
  def trait
    "ReactTextView text:'Inicia Sesión'"
  end

  def fill_in_input(input, text)
    touch("ReactEditText tag:'#{input}'")
    wait_for_keyboard
    enter_text "* tag:'#{input}'", text
  end
end
