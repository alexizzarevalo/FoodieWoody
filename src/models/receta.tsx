export interface Receta{
    id: string,
    nombre: string,
    descripcion: string,
    imagen: string,
    precio: number,
    pasos: Array<string>,
    negocio_id: string
}

export interface Ingrediente{
    nombre: string,
    imagen: string
}

export interface Ingrediente_Receta{
    receta_id: string,
    ingrediente_id: string,
    cantidad: number,
    unidad: string
}

export interface Unidad{
    forma_normal: string,
    abreviatura: string
}