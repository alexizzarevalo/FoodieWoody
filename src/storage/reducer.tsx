import { ActionTypes } from "./actions";
import { GlobalState, Item } from "./global-state.interface";

const initialState: GlobalState = {
  cart: [],
  search: '',
}

export function reducer(state = initialState, action: ActionTypes): GlobalState {
  switch (action.type) {
    case "SEARCH": {
      return { ...state, search: action.payload }
    }
    case 'SET_CART': {
      return { ...state, cart: [...action.payload] }
    }
    case 'INC_QUANTITY': {
      const cart = state.cart;
      const index = cart.findIndex((productCart) => {
        return productCart.receta_id == action.payload.receta_id;
      })

      cart[index].cantidad += 1;

      return { ...state, cart: [...cart] }
    }
    case 'DEC_QUANTITY': {
      const cart = state.cart;
      const index = cart.findIndex((productCart) => {
        return productCart.receta_id == action.payload.receta_id;
      })

      cart[index].cantidad -= 1;

      if (index >= 0 && cart[index].cantidad == 0) {
        cart.splice(index, 1);
      }
      return { ...state, cart: [...cart] }
    }
    case 'ADD_TO_CART': {
      const cart = state.cart;

      const index = cart.findIndex((product) => {
        return product.receta_id == action.payload.receta_id;
      })

      if (index == -1) {
        cart.push({ ...action.payload, cantidad: 1 });
      } else {
        cart[index].cantidad += 1;
      }

      return { ...state, cart: [...cart] }
    }
  }
  return state
}
