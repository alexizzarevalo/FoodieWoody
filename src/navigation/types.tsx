import { IReceta } from "../components/SearchScreen/Receta";

/*Screen names with their parameters*/
export type CartStackParamList = {
  Cart: undefined;
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
