require "calabash-android/abase"

class RegistroNegocioPage < Calabash::ABase
  def trait
    "ReactTextView text:'¡Registra tu Negocio!'"
  end

  # def fill_in_input(input, text)
  #   touch("ReactEditText tag:'#{input}'")
  #   wait_for_keyboard
  #   enter_text "* tag:'#{input}'", text
  # end
end
