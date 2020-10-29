export interface Recipe {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    ingredientes: string[];
    pasos: string[];
    tiempo_preparacion: number;
    precio: number;
    negocio_id: string;
}

export const defaultRecipe: Recipe = {
    id: '',
    nombre: '',
    descripcion: '',
    imagen: '',
    ingredientes: [],
    pasos: [],
    tiempo_preparacion: 0,
    precio: 0,
    negocio_id: ''
}