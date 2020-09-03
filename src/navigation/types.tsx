import { IReceta } from "../components/SearchScreen/Receta";
import {Receta} from '../models/receta'
/*Screen names with their parameters*/
export type CartStackParamList = {
  Cart:undefined;
  OrderCheckout: undefined;
  OrderConfirmation: undefined;
  DetalleReceta: {
    receta: Receta
  }
};

export type DrawerParamList = {
  Login: undefined;
  Search: undefined;
  Cart: undefined;
  Register: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
  Detail: {
    receta: IReceta
  };
}
