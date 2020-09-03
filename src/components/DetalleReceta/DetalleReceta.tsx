import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { Receta, Ingrediente } from '../../models/receta';
import { User } from '../../models/user';

import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import { CartStackParamList } from '../../navigation/types';

var receta: Receta = {
    id: "",
    nombre: "Pizza Hawaiana",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor sem nunc, ullamcorper iaculis sapien efficitur eu. Morbi maximus mattis sem, eget dignissim neque tempor eget. Ut viverra sagittis accumsan. ",
    imagen: "https://i.cbc.ca/1.3993184.1583946118!/fileImage/httpImage/hawaiian-pizza-pineapple-pizza.jpg",
    precio: 50,
    pasos: ["Preparar el pan, y una linea bastante larga para ver como realiza el wrap la aplicacion.", "Hornear el pan."],
    negocio_id: "users/Z2Pzggc3gem8Bx5qsbgD"
}

function getIngredientes(id:string): Array<Ingrediente>{

    return [
        {
            nombre: 'Pan',
            imagen: ''
        },
        {
            nombre: 'Piña',
            imagen: ''
        }
    ]
}

function getNegocioNombre(negocio_id: string) {
    return "Domino's Pizza";
}


function SectionTitle({title}: {title: string}) {
  return(
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 0.3, height: 1, backgroundColor: 'lightgray'}} />
      <View style={{flex: 0.4}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
      </View>
      <View style={{flex: 0.3, height: 1, backgroundColor: 'lightgray'}} />
    </View>
  );
}

function DetalleReceta({route}:StackScreenProps<CartStackParamList, "DetalleReceta">) {

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <View style={styles.orangeFranja}></View>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} source={{ uri: receta.imagen }} />
                        <Text style={styles.name}>{receta.nombre}</Text>
                    </View>
                </View>
                <View>
                    <View style={styles.metdataWrapper}>
                        <Text style={styles.metadata}>Vendedor:</Text>
                        <Text style={styles.detailData}>{getNegocioNombre(receta.negocio_id)}</Text>
                    </View>
                    <View style={styles.metdataWrapper}>
                        <Text style={styles.metadata}>Precio:</Text>
                        <Text style={styles.detailData}>Q{receta.precio}.00</Text>
                    </View>
                </View>
                <View style={styles.blockText}>
                    <Text style={{textAlign:"justify"}}>{receta.descripcion}</Text>
                </View>
                <View>
                    <SectionTitle title="Ingredientes"/>
                        {getIngredientes(receta.id).map((ingrediente, index) =>                           
                            <View key={index} style={styles.bulletItem}>
                                <Text style={{textAlign:"justify"}}>{'\u2022 '} {ingrediente.nombre}</Text> 
                            </View>
                        )}
                </View>
                <View>
                    <SectionTitle title="Preparacion"/>
                    {receta.pasos.map((paso, index) => 
                        <View key={index} style={styles.bulletItem}>
                            <Text style={{textAlign:"justify"}}>{index + 1}. {paso}</Text>
                        </View>
                    )}

                    
                </View>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    orangeFranja: {
        backgroundColor: '#f87c09',
        height: 100
    },
    imageWrapper: {
        alignItems: 'center',
        marginTop: -75,
        marginBottom: 10
    },
    image: {
        width: 150,
        height: 150,
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 100
    },
    name: {
        fontSize: 40,
        color: 'grey'
    },
    metdataWrapper: {
        flexDirection: 'row',
        marginBottom: 10
    },
    metadata: {
        fontWeight: '600',
        fontSize: 15,
        width: 120,
        textAlign: 'right',
        marginRight: 5
    },
    detailData: {
        fontSize: 15
    },
    blockText: {
        padding: 20
    },
    bulletItem: {
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 5
    }
});

export default DetalleReceta;