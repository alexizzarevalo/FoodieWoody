import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from "react-native";
import {Picker} from "@react-native-community/picker";

export default function AddAddress({route, navigation}:any){
  const [direction,setDirection]= useState({
    pais:'', estado:'', provincia: '', address:''
  })
  const pressHandler = () => {
    navigation.navigate('OrderConfirmation');
  }
  return(
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView>
          <Text style={styles.label}>Pais</Text>
          <TextInput
            style={styles.input}
            placeholder={'Ingrese su pais'}
            onChange={(val) => setDirection({...direction,pais:val})}
          >
          </TextInput>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.input}
            placeholder={'Ingrese su estado'}
            onChange={(val) => setDirection({...direction,estado:val})}
          >
          </TextInput>
          <Text style={styles.label}>Ciudad</Text>
          <TextInput
            style={styles.input}
            placeholder={'Ingrese su ciudad'}
            onChange={(val) => setDirection({...direction,ciudad:val})}
          >
          </TextInput>
          <Text style={styles.label}>Direccion</Text>
          <TextInput
            style={styles.input}
            placeholder={'Ingrese su direccion'}
            onChange={(val) => setDirection({...direction,address:val})}
          >
          </TextInput>
          <Button title={'Agregar direccion'} onPress={pressHandler}/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    marginLeft:10,
    marginRight:10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#05375a',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    marginBottom:10,
  },
});
