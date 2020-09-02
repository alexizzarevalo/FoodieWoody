import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

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
    receta: IReceta
}

export default function Receta({ receta }: Props) {
    return (
        <View style={{
            flex: 1, flexDirection: 'row',
            borderRadius: 8,
            overflow: 'hidden',
            justifyContent: 'space-between', backgroundColor: 'blue', marginHorizontal: 20, marginVertical: 8
        }}>
            <View style={{ width: 80, height: 80, borderRadius: 8, overflow: 'hidden' }}>
                <Image source={{ uri: 'https://cdn2.cocinadelirante.com/sites/default/files/styles/gallerie/public/images/2017/04/pizzapepperoni0.jpg' }} resizeMode="cover" height={80} width={80} style={{ borderRadius: 8, width: 80, height: 80 }}></Image>
            </View>
            <View style={{ justifyContent: 'space-evenly', marginHorizontal: 8 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{receta.nombre}</Text>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Q{receta.precio}</Text>
            </View>
            <View style={{ justifyContent: 'center', marginRight: 0 }}>
                <TouchableHighlight style={{
                    backgroundColor: 'green',
                    height: 80,
                    width: 80 / 2,
                    borderTopLeftRadius: 20,
                    borderBottomLeftRadius: 20,
                }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 35 }}>+</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </View>
    );
}