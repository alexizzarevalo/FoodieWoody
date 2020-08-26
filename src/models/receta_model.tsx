export interface Ingrediente {
    ingrediente_nombre: String,
    ingrediente_cantidad: Number,
    ingrediente_unidad: String,
}

export interface Receta {
    receta_nombre: String,
    receta_descripcion: String,
    receta_precio: Number,
    receta_ingredientes: Ingrediente[]
}