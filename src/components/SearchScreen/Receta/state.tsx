import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "../../../navigation/types";
import { GlobalDispatch } from "../../../storage";
import { useDispatch } from "react-redux";

export interface IReceta {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    pasos: string[];
    negocio_id: string;
}

export type Props = {
    receta: IReceta;
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