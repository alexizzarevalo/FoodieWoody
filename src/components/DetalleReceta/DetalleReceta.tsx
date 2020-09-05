import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Receta, Ingrediente } from '../../models/receta';

import firestore from '@react-native-firebase/firestore';
import { StackScreenProps } from '@react-navigation/stack';
import { SearchStackParamList } from '../../navigation/types';

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

function DetalleReceta({route}:StackScreenProps<SearchStackParamList, "DetalleReceta">) {

    const receta: Receta = route.params.receta;
    const [negocio_nombre, setNegocioNombre] = useState('');
    const [ingredientes, setIngredientes] = useState(Array<Ingrediente>());

    function getNegocioNombre(negocio_id: string) {
        firestore().doc(negocio_id).get().then(
            doc => {
                setNegocioNombre(doc.get('nombre') as string)
            }
        )
    }

    function getIngredientes(){
        firestore().collection('ingredientes_receta').where('receta_id', '==', 'recetas/' + receta.id).get().then(
            query => {
                const ids = Array<string>();
                query.docs.forEach(doc => {
                    ids.push((doc.data().ingrediente_id as string).substring('ingredientes/'.length));
                })
                console.log(ids);

                firestore().collection('ingredientes').where('id', 'in', ids).get().then(
                    query => {
                        const ingredientes = Array<Ingrediente>();
                        query.docs.forEach(doc => {
                            ingredientes.push(doc.data() as Ingrediente);
                        })

                        setIngredientes(ingredientes);
                    }
                )
            }
        );
    }

    useEffect(() => {
        getNegocioNombre(receta.negocio_id);
        getIngredientes();
    }, [])

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
                        <Text style={styles.detailData}>{negocio_nombre}</Text>
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
                        {ingredientes.map((ingrediente, index) =>                           
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