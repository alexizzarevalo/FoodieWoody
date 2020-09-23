import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { useRecetaElements, Props } from "./state";

export type { IReceta } from './state';

export default function Receta({ receta, nav }: Props) {
    const { addToCart, goToDetails } = useRecetaElements({ nav, receta });
    return (
        <View style={{
            flex: 1, flexDirection: 'row',
            borderRadius: 8,
            overflow: 'hidden',
            justifyContent: 'space-between', backgroundColor: '#acc2de', marginHorizontal: 20, marginVertical: 8
        }}>
            <View style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden' }}>
                <TouchableHighlight onPress={goToDetails}>
                    <Image source={{ uri: receta.imagen }} resizeMode="cover" height={80} width={80} style={{ borderRadius: 8, width: 80, height: 80 }}></Image>
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