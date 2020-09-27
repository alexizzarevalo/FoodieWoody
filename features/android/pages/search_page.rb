require "calabash-android/abase"

class SearchPage < Calabash::ABase
  def trait
    "ReactTextView text:'Foodie Woody'"
  end

  def search(text)
    touch("ReactTextView tag:'searchIcon'")
    touch("ReactEditText tag:'searchInput'")
    wait_for_keyboard
    enter_text "* tag:'searchInput'", text
  end
end
