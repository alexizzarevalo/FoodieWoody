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


declare const global: {HermesInternal: null | {}};

export default function CrearReceta(){
    const [text, setText] = useState('');
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
                      onChangeText={text => setText(text)}
                      defaultValue=""
                  />
                  
             
              <View style={styles.separador}></View>
              
                  
                      <Text> Descripción: </Text>
                  
                  
                  <TextInput
                      style={styles.textig}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={text => setText(text)}
                      defaultValue=""
                  />
              
              
              <View style={styles.separador}></View>
              
                  
                      <Text> Ingredientes: </Text>
                 
                  
                  <TextInput
                      style={styles.textig}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={text => setText(text)}
                      defaultValue=""
                  />
                  
              
              <View style={styles.separador}></View>
              
                  
                      <Text> Tiempo de preparación: </Text>
                  
                  
                  <TextInput
                      style={styles.texti}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={text => setText(text)}
                      defaultValue=""
                  />
                  
              
              <View style={styles.separador}></View>
              
                  
                      <Text> Costo total: </Text>
                  
                 
                  <TextInput
                      style={styles.texti}
                      underlineColorAndroid = "transparent"
                      placeholder=""
                      onChangeText={text => setText(text)}
                      defaultValue=""
                  />
                 
              
              <TouchableOpacity
                style={styles.boton}
                
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

