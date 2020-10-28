import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { Recipe } from "./../CreateAndUpdateRecipe/state";
//Produccion
//Con este si funciona bien
import firestore from '@react-native-firebase/firestore'

//Test
//BUG error en la configuración
//import { firestore } from '../../firebaseConfig';

import { StackScreenProps } from '@react-navigation/stack';
import { SearchStackParamList } from '../../navigation/types';

export function SectionTitle({title}: {title: string}) {
  return(
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 0.3, height: 1, backgroundColor: 'lightgray'}} />
      <View style={{flex: 0.4}}>
        <Text testID='title' style={{textAlign: 'center', fontSize: 20}}>{title}</Text>
      </View>
      <View style={{flex: 0.3, height: 1, backgroundColor: 'lightgray'}} />
    </View>
  );
}

export function StaticComponent({negocio_nombre, receta}:
    {negocio_nombre: string, receta: Recipe}){

    return (<View style={styles.container}>
        <ScrollView>
            <View>
                <View style={styles.orangeFranja}></View>
                <View style={styles.imageWrapper}>
                    <Image testID="imagen" style={styles.image} source={{ uri: receta.imagen }} />
                    <Text testID="nombre" style={styles.name}>{receta.nombre}</Text>
                </View>
            </View>
            <View>
                <View style={styles.metdataWrapper}>
                    <Text style={styles.metadata}>Vendedor:</Text>
                    <Text testID='negocio_nombre' style={styles.detailData}>{negocio_nombre}</Text>
                </View>
                <View style={styles.metdataWrapper}>
                    <Text style={styles.metadata}>Precio:</Text>
                    <Text testID="precio" style={styles.detailData}>Q{receta.precio}</Text>
                </View>
            </View>
            <View style={styles.blockText}>
                <Text testID="descripcion" style={{textAlign:"justify"}}>{receta.descripcion}</Text>
            </View>
            <View>
                <SectionTitle title="Ingredientes"/>
                    {receta.ingredientes.map((ingrediente, index) =>
                        <View key={index} style={styles.bulletItem}>
                            <Text style={{textAlign:"justify"}}>{'\u2022 '} {ingrediente}</Text>
                        </View>
                    )}
            </View>
            <View>
                <SectionTitle title="Preparacion"/>
                {receta.pasos?.map((paso, index) =>
                    <View key={index} style={styles.bulletItem}>
                        <Text style={{textAlign:"justify"}}>{index + 1}. {paso}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    </View>)
}

export function getNegocioNombre(negocio_id:string, stateCallback: Function){
    firestore().doc(negocio_id).get().then(
        doc => {
            stateCallback(doc.get('nombre') as string)
        }
    )
}

function DetalleReceta({route}:StackScreenProps<SearchStackParamList, "DetalleReceta">) {

    const receta: Recipe = route.params.receta;

    const [negocio_nombre, setNegocioNombre] = useState('');

    useEffect(() => {
        getNegocioNombre(receta.negocio_id, setNegocioNombre);
    }, [])

    if(receta.ingredientes.length != 0 && negocio_nombre.length != 0)
        return <StaticComponent receta={receta} negocio_nombre={negocio_nombre}/>
    else
        return <></>
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
