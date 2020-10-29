import { StackNavigationProp } from "@react-navigation/stack";
import { MyRecipesStackParamList } from "../../../navigation/types";
import { Recipe } from '../../CreateAndUpdateRecipe/state';
export type { Recipe } from '../../CreateAndUpdateRecipe/state';

export type Props = {
    receta: Recipe;
    nav: StackNavigationProp<MyRecipesStackParamList, 'ListOfRecipes'>;
}