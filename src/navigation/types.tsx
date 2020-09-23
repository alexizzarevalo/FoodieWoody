import { IReceta } from "../components/SearchScreen/Receta";
import {Receta} from '../models/receta'
/*Screen names with their parameters*/
export type CartStackParamList = {
  OrderCheckout: undefined;
  OrderConfirmation: {
    total: number;
  };
};

export type DrawerParamList = {
  Login: undefined;
  Logout: undefined;
  Search: undefined;
  Register: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
  DetalleReceta: {
    receta: IReceta
  };
  Checkout: undefined;
}
