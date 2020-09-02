import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import { Receta, Ingrediente } from '../../models/receta'

var receta: Receta = {
    id: "",
    nombre: "Pizza",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer porttitor sem nunc, ullamcorper iaculis sapien efficitur eu. Morbi maximus mattis sem, eget dignissim neque tempor eget. Ut viverra sagittis accumsan. ",
    imagen: "https://homepages.cae.wisc.edu/~ece533/images/fruits.png",
    precio: 50,
    pasos: ["Preparar el pan.", "Hornear el pan."],
    negocio_id: ""
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

function getNegocioNombre(negocio_id:string): string{
    return 'Dominos Pizza'
  }



function SectionTitle({title}: {title: string}) {
  return(
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
      <View>
        <Text style={{width: '7em', textAlign: 'center', fontSize: 20}}>{title}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: 'lightgray'}} />
    </View>
  );
}

function DetalleReceta() {
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
                    {getIngredientes(receta.id).map((ingrediente) => <Text>{ingrediente.nombre}</Text> )}
                </View>
                <View>
                  <SectionTitle title="Preparacion"/>
                    {receta.pasos.map((paso, index) => <Text>{index + 1}. {paso}</Text> )}
                </View>
                <View style={{
                    flexDirection: "row", justifyContent: "space-evenly", padding: 5, borderBottomColor: 'lightgray',
                    borderBottomWidth: 1
                }}>
                    <View style={{ flex: 0.1 }}>
                        <Button
                            title="-"
                            onPress={() => { { () => null } }}
                        //disabled={amount <= 0}
                        />
                    </View>
                    <View style={{ flex: 0.1, justifyContent: 'center' }}>
                        <Text style={{ textAlign: "center" }}>
                        </Text>
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Button
                            title="+"
                            onPress={() => { { () => null } }}
                        />
                    </View></View>
                <View>
                    <Button title="Agregar a carrito" onPress={() => console.log("deberia ir a checkout")} />
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
        justifyContent: 'center',
        padding: '1em'
    },
    sectionTitle: {
      fontSize: 20
    }
});

export default DetalleReceta;