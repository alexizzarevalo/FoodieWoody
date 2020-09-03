export interface GlobalState {
  cart: Item[];
  search: string;
}

export interface Item {
  receta_id: string,
  cantidad: number,
}
