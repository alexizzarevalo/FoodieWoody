require "calabash-android/abase"

class LoginPage < Calabash::ABase
  def trait
    "ReactTextView text:'Inicia Sesión'"
  end

  def login(email, passw)
    set_text_input("emailInput", email)
    set_text_input("passwordInput", passw)
    touch_button_by_text "Iniciar sesión"
    touch_alert_button_by_text("OK")
  end
end
