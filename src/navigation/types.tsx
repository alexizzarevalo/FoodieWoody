import {Receta} from '../models/receta'

/*Screen names with their parameters*/
export type CartStackParamList = {
  Cart: undefined;
  DetalleReceta: {
    receta: Receta
  }
};

export type DrawerParamList = {
  Login: undefined;
  Cart: undefined;
  Register: undefined;
};
