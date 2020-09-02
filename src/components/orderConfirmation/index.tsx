import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {Picker} from "@react-native-community/picker";
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';
import firestore from '@react-native-firebase/firestore'

interface User{
  nombre:string,
  apellido:string,
  correo:string,
  direccion:string,
  telefono:string,
}

export default function orderConfirmation({route, navigation}:StackScreenProps<CartStackParamList,'OrderConfirmation'>){
  const [customerInformation, setCustomerInformation] = useState<User>({
    nombre:'',
    apellido:'',
    correo:'',
    telefono:'',
    direccion:''
  });
  useEffect(()=>{
    //Utilizar el hook para obtenerel UID
    firestore()
      .collection('users')
      .doc('')
      .get()
      .then((documentSnapShot) =>{
        setCustomerInformation(documentSnapShot.data() as User)
      })
  },[]);
  const pressHandler = () =>{ /*confirmar el pedido*/ navigation.navigate('Cart') }
  return(
    <View style={styles.container}>
      <View style={styles.body}>
        <ScrollView>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            editable = {false}
          >
            {customerInformation.nombre} {customerInformation.apellido}
          </TextInput>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            editable = {false}
          >
            {customerInformation.correo}
          </TextInput>
          <Text style={styles.label}>Telefono</Text>
          <TextInput
            style={styles.input}
            editable = {false}
          >
            {customerInformation.telefono}
          </TextInput>
          <Text style={styles.label} >Direccion de envio</Text>
          <View style={styles.picker}>
            <Picker>
              <Picker.Item label={customerInformation.direccion} value={customerInformation.direccion} />
            </Picker>
          </View>
          <Text style={styles.label} >Metodo de pago</Text>
          <View style={styles.picker}>
            <Picker>
              <Picker.Item label={"Efectivo"} value={"Efectivo"} />
            </Picker>
          </View>
          <Text style={styles.label}>Total</Text>
          <TextInput style={styles.input} editable = {false}>Q.100</TextInput>
          <TouchableHighlight style={styles.Button} onPress={pressHandler}>
            <Text style={styles.textButton}>Terminar pedido</Text>
          </TouchableHighlight>
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
  picker: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 17,
    marginBottom:10,
  },
  Button : {
    elevation: 8,
    backgroundColor: "#2d74ee",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin : 15,
  },
  textButton : {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});
