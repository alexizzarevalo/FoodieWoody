import React from "react";
import { View, Text, Image, Alert } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { SearchStackParamList } from "../../../navigation/types";

export interface IReceta {
    id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
    precio: number;
    pasos: string[];
    negocio_id: string;
}

type Props = {
    receta: IReceta;
    nav: StackNavigationProp<SearchStackParamList, 'Search'>;
}

export default function Receta({ receta, nav }: Props) {
    
    function addToCart() {
        // TODO: Agregar al carrito esta receta (Contexto global)
        Alert.alert('Agregar al carrito', `¿Desea agregar ${receta.nombre} a su carrito?`)
    }

    function goToDetails() {
        nav.navigate('Detail', {
            receta
        })
    }

    return (
        <View style={{
            flex: 1, flexDirection: 'row',
            borderRadius: 8,
            overflow: 'hidden',
            justifyContent: 'space-between', backgroundColor: '#acc2de', marginHorizontal: 20, marginVertical: 8
        }}>
            <View style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden' }}>
                <TouchableHighlight onPress={goToDetails}>
                    <Image source={{ uri: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pizzapepperoni0.jpg' }} resizeMode="cover" height={80} width={80} style={{ borderRadius: 8, width: 80, height: 80 }}></Image>
                </TouchableHighlight>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'space-evenly', marginHorizontal: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{receta.nombre}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Q{receta.precio}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginRight: 0 }}>
                <TouchableHighlight style={{
                    backgroundColor: 'purple', //#11c222
                    height: 80,
                    width: 80 / 2,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                }}
                    onPress={addToCart}
                    underlayColor='#f1c222'
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 35, color: 'white' }}>+</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}