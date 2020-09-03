import { Item } from "./global-state.interface"

export interface SearchAction {
  type: 'SEARCH';
  payload: string;
}

export interface SetCartAction {
  type: 'SET_CART';
  payload: Item[]
}

export interface IncQuantityAction {
  type: 'INC_QUANTITY';
  payload: Item;
}

export interface DecQuantityAction {
  type: 'DEC_QUANTITY';
  payload: Item;
}

export interface AddToCartAction {
  type: 'ADD_TO_CART',
  payload: Item
}

export type ActionTypes = SearchAction | SetCartAction | IncQuantityAction | DecQuantityAction | AddToCartAction;
