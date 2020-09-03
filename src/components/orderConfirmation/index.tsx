import React, {useEffect, useState} from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {Picker} from "@react-native-community/picker";
import {StackScreenProps} from '@react-navigation/stack';
import {CartStackParamList} from '../../navigation/types';
import firestore from '@react-native-firebase/firestore'
import {styles} from '../../Style';
import {GlobalDispatch, useGlobalSelector} from '../../storage';
import {useDispatch} from 'react-redux';
import {Item} from '../../storage/global-state.interface';
import useUser from '../../hook/useUser';

interface User{
  nombre:string,
  apellido:string,
  correo:string,
  direccion:string,
  telefono:string,
}

export default function orderConfirmation(
  {route, navigation}: any){
  const {total} = route.params
  const cart:Item[] = useGlobalSelector(({cart})=>cart)
  const dispatch:GlobalDispatch=useDispatch();
  const {user} = useUser()
  const uid = user?.uid
  const [customerInformation, setCustomerInformation] = useState<User>({
    nombre:'',
    apellido:'',
    correo:'',
    telefono:'',
    direccion:''
  });
  useEffect(()=>{
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then((documentSnapShot) =>{
        setCustomerInformation(documentSnapShot.data() as User)
      })
  },[]);
  const pressHandler = () =>{
    const aux:{}[] = [];
    cart.map((i)=>{
      aux.push({receta:'recetas/'+i.receta_id,cantidad:i.cantidad})
    })

    //Adding format to the info
    firestore()
      .collection('ordenes')
      .add({
        user_id: 'users/'+uid,
        recetas: aux
      })
      .then(() => {
        console.log('Orden added!');
      });

    dispatch({type:'SET_CART',payload:[]})
    navigation.navigate('Cart')
  }
  return(
    <View style={styles.container}>
      <View >
        <ScrollView>
          <Text style={styles.text_header}>Nombre</Text>
          <TextInput
            style={styles.textInput}
            editable = {false}
          >
            {customerInformation?.nombre} {customerInformation?.apellido}
          </TextInput>
          <Text style={styles.text_header}>Correo</Text>
          <TextInput
            style={styles.textInput}
            editable = {false}
          >
            {customerInformation?.correo}
          </TextInput>
          <Text style={styles.text_header}>Telefono</Text>
          <TextInput
            style={styles.textInput}
            editable = {false}
          >
            {customerInformation?.telefono}
          </TextInput>
          <Text style={styles.text_header} >Direccion de envio</Text>
          <View >
            <Picker>
              <Picker.Item label={customerInformation?.direccion} value={customerInformation?.direccion} />
            </Picker>
          </View>
          <Text style={styles.text_header} >Metodo de pago</Text>
          <View >
            <Picker>
              <Picker.Item label={"Efectivo"} value={"Efectivo"} />
            </Picker>
          </View>
          <Text style={styles.text_header}>Total</Text>
          <TextInput style={styles.textInput} editable = {false}>Q.{total}</TextInput>
          <TouchableHighlight style={styles.button} onPress={pressHandler}>
            <Text style={styles.textButton}>Terminar pedido</Text>
          </TouchableHighlight>
        </ScrollView>
      </View>
    </View>
  );
}

/*const styles = StyleSheet.create({
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
});*/
