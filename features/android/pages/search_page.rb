require "calabash-android/abase"

class SearchPage < Calabash::ABase
  def trait
    "ReactTextView text:'Foodie Woody'"
  end

  def search(text)
    touch_icon("searchIcon")
    set_text_input("searchInput", text)
  end

  def go_to_cart()
    touch_icon("cartIcon")
  end

  def touch_icon(id)
    touch("ReactTextView tag:'#{id}'")
  end

  def set_text_input(id, text)
    touch("ReactEditText tag:'#{id}'")
    wait_for_keyboard
    enter_text "* tag:'#{id}'", text
  end
end
