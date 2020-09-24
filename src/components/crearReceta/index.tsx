import React,{ useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import firestore from '@react-native-firebase/firestore'

export default function CrearReceta(){
    const [nombrer, setNombrer] = useState('');
    const [costo, setCosto] = useState('');
    const [desc, setDesc] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [preparacion, setPreparacion] = useState('');

    const pressHandler = () =>{
        //Adding format to the info
        firestore()
          .collection('recetas')
          .add({
            descripcion: desc,
            id: "prueba",
            imagen: "https://dam.cocinafacil.com.mx/wp-content/uploads/2019/08/comida-tailandesa.jpg",
            negocio_id: "users/Z2Pzggc3gem8Bx5qsbgD", 
            nombre: nombrer,
            pasos: {},
            precio: parseInt(costo)
          })
          .then(() => {
            console.log('Receta agregada!');
          });
      }
    return (
      <>
        <StatusBar barStyle="dark-content" />
          <View style={styles.container}>
              <Text style={styles.titulo}> Crea una receta </Text>
                      <Text style={styles.textos}> Nombre: </Text>
                  <TextInput
                      style={styles.texti}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={nombre => setNombrer(nombrer)}
                      defaultValue=""
                  />
              <View style={styles.separador}></View>
                      <Text> Descripción: </Text>
                  <TextInput
                      style={styles.textig}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={desc => setDesc(desc)}
                      defaultValue=""
                  />
              <View style={styles.separador}></View>
                      <Text> Ingredientes: </Text>
                  <TextInput
                      style={styles.textig}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={ingredientes => setIngredientes(ingredientes)}
                      defaultValue=""
                  />
              <View style={styles.separador}></View>
                      <Text> Tiempo de preparación: </Text>
                  <TextInput
                      style={styles.texti}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={preparacion => setPreparacion(preparacion)}
                      defaultValue=""
                  />
              <View style={styles.separador}></View>
                      <Text> Costo total: </Text>
                  <TextInput
                      style={styles.texti}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={costo => setCosto(costo)}
                      defaultValue=""
                  />
              <TouchableOpacity
                style={styles.boton}
                onPress={pressHandler}
              >
                <Text>Crear</Text>
              </TouchableOpacity>
          </View>
      </>
    );
  };
  
  const styles = StyleSheet.create({
      container : {
          flex : 1,
          flexDirection : 'column',
          backgroundColor: '#f87c09'
      },
      textos : {
        marginBottom : 5
      },
      titulo : {
        textAlign: 'center',
        marginTop: 20,
        marginBottom : 20,
        fontSize: 24
      },
      texti : {
        marginLeft: 40,
          height : 30,
          width : '80%',
          backgroundColor : 'white',
          borderColor : 'purple',
          borderWidth : 1,
          borderRadius: 5
      },
      textig : {
        marginLeft: 40,
          height : 110,
          width : '80%',
          backgroundColor : 'white',
          borderColor : 'purple',
          borderWidth : 1,
          borderRadius: 5
      },
      boton : {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        width: '80%',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        marginTop : 20
      },
      separador : {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        marginTop : 10,
        marginBottom : 10
      }
  });

