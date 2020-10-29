import { Recipe } from "../models/recipe";

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
  RegistroNegocio: undefined;
  CrearReceta: {
    id?: string;
  };
};

export type SearchStackParamList = {
  Search: undefined;
  DetalleReceta: {
    receta: Recipe
  };
  Checkout: undefined;
}

export type MyRecipesStackParamList = {
  ListOfRecipes: undefined;
  CreateAndUpdateRecipe: {
    id?: string;
  };
}
