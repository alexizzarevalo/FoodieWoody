require "calabash-android/abase"

class LoginPage < Calabash::ABase
  def trait
    "ReactTextView text:'Inicia Sesión'"
  end

  def login
    set_text_input("emailInput", "dalexis.da@gmail.com")
    set_text_input("passwordInput", "123456")
    touch_button_by_text "Iniciar sesión"
    touch_alert_button_by_text("OK")
  end
end
