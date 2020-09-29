require "calabash-android/abase"

class DetalleRecetaPage < Calabash::ABase

    def trait
        "ReactTextView text:'Cerrar sesión'"
    end

    def select_first_item(imageDetails)
        touch("ReactImageView tag:'#{imageDetails}'")
    end

end
