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
end
