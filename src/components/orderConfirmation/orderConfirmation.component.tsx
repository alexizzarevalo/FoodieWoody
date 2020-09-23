import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { styles } from '../../Style';
import Template from './orderConfirmation.view';

import firestore, {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {firebase, FirebaseAuthTypes} from '@react-native-firebase/auth';

import { GlobalDispatch, useGlobalSelector } from '../../storage';
import { useDispatch } from 'react-redux';
import { Item } from '../../storage/global-state.interface';

interface User {
  nombre: string,
  correo: string,
  direccion: string,
  telefono: string,
}

function first_page(uid:any,setCustomInformation:any){
  if (uid) {
    get_customer_info(uid)
      .then(documentSnapShot => {
        setCustomInformation(documentSnapShot.data() as User)
      })
  }
}

function get_customer_info(uid:string):Promise<FirebaseFirestoreTypes.DocumentSnapshot>{
  return new Promise(resolve => {
    firestore()
      .collection('users')
      .doc(uid)
      .get()
      .then(resolve)
  })
}

function save_pedido(uid:any,aux:any){
  return new Promise((resolve) => {firestore()
    .collection('ordenes')
    .add({
      user_id: 'users/' + uid,
      recetas: aux
    })
    .then(resolve);
  })
}

export default function orderConfirmation(
  { route, navigation }: any) {
  const [customerInformation, setCustomerInformation] = useState<User>({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  });
  const {total} = route.params
  const cart: Item[] = useGlobalSelector(({cart}) => cart)
  const dispatch: GlobalDispatch = useDispatch();
  const {currentUser} = firebase.auth()

  useEffect(() => {
    first_page(currentUser?.uid,setCustomerInformation)
  }, []);

  const pressHandler = () => {
    const aux: {}[] = [];
    cart.map((i) => {
      aux.push({receta: 'recetas/' + i.receta_id, cantidad: i.cantidad})
    })
    save_pedido(currentUser?.uid,aux)
      .then(() => {
        console.log('Orden added!');
      })
    dispatch({type: 'SET_CART', payload: []})
    navigation.navigate('Search')
  }

  return(
    <Template customerInformation={customerInformation} total={total} pressHandler={pressHandler} />
  )
}
