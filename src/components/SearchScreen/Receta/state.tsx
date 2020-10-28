import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "../../../navigation/types";
import { GlobalDispatch } from "../../../storage";
import { useDispatch } from "react-redux";
import { Recipe } from '../../CreateAndUpdateRecipe/state';
export type { Recipe } from '../../CreateAndUpdateRecipe/state';

export type Props = {
    receta: Recipe;
    nav: StackNavigationProp<SearchStackParamList, 'Search'>;
}

export function useRecetaElements({ nav, receta }: Props) {
    const dispatch: GlobalDispatch = useDispatch();

    function addToCart() {
        Alert.alert('Agregar al carrito', `¿Desea agregar ${receta.nombre} a su carrito?`, [
            { text: 'Cancelar' },
            {
                text: 'Agregar',
                onPress: () => {
                    dispatch({ type: 'ADD_TO_CART', payload: { receta_id: receta.id, cantidad: 1 } })
                }
            }
        ])
    }

    function goToDetails() {
        nav.navigate('DetalleReceta', {
            receta
        })
    }

    return {
        addToCart,
        goToDetails
    }
}