export interface Ingrediente {
    nombre: String,
    cantidad: Number,
    unidad: String,
}

export interface Receta {
    nombre: String,
    descripcion: String,
    precio: Number,
    ingredientes: Ingrediente[]
}