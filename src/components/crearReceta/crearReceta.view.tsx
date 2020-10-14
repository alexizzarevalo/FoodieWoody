import {StatusBar,Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {PropsWithChildren} from 'react';

export default function Template({
  pressHandler}:PropsWithChildren<any>){
  return (
    <>
    <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
          <Text style={styles.titulo}> Crea una receta </Text>
                  <Text style={styles.textos}> Nombre: </Text>
              <TextInput
                  testID={"nombre"}
                  style={styles.texti}
                  underlineColorAndroid = "transparent"
                  placeholder=""
                  value = ""
                  defaultValue=""
              />
          <View style={styles.separador}></View>
                  <Text> Descripción: </Text>
              <TextInput
                  style={styles.textig}
                  testID={"desc"}
                  underlineColorAndroid = "transparent"
                  placeholder=""
                  value = ""
                  defaultValue=""
              />
          <View style={styles.separador}></View>
                  <Text> Ingredientes: </Text>
              <TextInput
                  style={styles.textig}
                  testID={"ingredientes"}
                  underlineColorAndroid = "transparent"
                  placeholder=""
                  value = ""
                  defaultValue=""
              />
          <View style={styles.separador}></View>
                  <Text> Tiempo de preparación: </Text>
              <TextInput
                  style={styles.texti}
                  testID={"preparacion"}
                  underlineColorAndroid = "transparent"
                  placeholder=""
                  value = ""
                  defaultValue=""
              />
          <View style={styles.separador}></View>
                  <Text> Costo total: </Text>
              <TextInput
                  style={styles.texti}
                  testID={"total"}
                  underlineColorAndroid = "transparent"
                  placeholder=""
                  value = ""
                  defaultValue=""
              />
          <TouchableOpacity
            testID={"btnCrear"}
            style={styles.boton}
            onPress={pressHandler}
          >
            <Text>Crear</Text>
          </TouchableOpacity>
      </View>
  </>
    );
}

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